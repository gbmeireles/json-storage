import { httpService } from "http";

class SendTransferService {
  constructor(csr) {
    this.csr = csr;
    var dt = new Date();
    var d = dt.getDate();
    var m = dt.getMonth();
    var y = dt.getFullYear();
    this.dateStr = d + "-" + m + "-" + y;
  }

  send(data) {
    crs = this.csr.init(data);
    httpService
      .post("/audit/logger", {
        uid: UID.generate(),
        executionDate: this.dateStr,
        amount: data.amount,
        title: data.title,
        cid: data.clientId,
      })
      .then(function () {
        data.amount =
          this.crs.calculateCommisionRate() > 0
            ? data.amount + this.crs.calculateCommisionRate()
            : data.amount;

        httpService.post({ date: date, data: data });
      });
  }
}
