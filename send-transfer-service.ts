import { httpService } from "http";
import { uid } from "uid";

interface ComissionRateService {
  init(data: SendTransferData): ComissionRateCalculator;
}

interface ComissionRateCalculator {
  calculateCommisionRate(): number;
}

interface SendTransferData {
  amount: number;
  title: string;
  clientId: string;
}

interface AuditData {
  executionDate: string;
  amount: number;
  title: string;
  clientId: string;
}

class Logger {
  warn(...args: unknown[]) {
    console.warn(...args);
  }
}

class CustomHttpService {
  post(url: string, data: unknown): Promise<unknown> {
    return httpService.post(url, data);
  }
}

class AuditService {
  constructor(private httpService: CustomHttpService) {}
  log(data: AuditData): Promise<unknown> {
    const generatedId = uid();
    return this.httpService.post("/audit/logger", {
      uid: generatedId,
      executionDate: data.executionDate,
      amount: data.amount,
      title: data.title,
      cid: data.clientId,
    });
  }
}

class SendTransferService {
  constructor(
    private comissionRateService: ComissionRateService,
    private auditService: AuditService,
    private httpService: CustomHttpService,
    private logger: Logger
  ) {}

  async send(data: SendTransferData) {
    try {
      const comissionRateCalculator = this.comissionRateService.init(data);
      const executionDate = this.getExecutionDate();

      await this.auditService.log({
        executionDate: executionDate,
        amount: data.amount,
        title: data.title,
        clientId: data.clientId,
      });

      const commissionRate = comissionRateCalculator.calculateCommisionRate();

      data.amount =
        commissionRate > 0 ? data.amount + commissionRate : data.amount;

      await this.httpService.post("", { date: executionDate, data: data });
    } catch (err) {
      this.logger.warn(err);
    }
  }

  private getExecutionDate(): string {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
