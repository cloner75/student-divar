import { CronJob } from 'cron';
import ProductModel from './../models/product';
import UserModel from './../models/user';

class CronJobs {
  constructor() {
    this.checkExpireTime();
  }

  checkExpireTime() {
    let job = new CronJob('* * * * * *', async () => {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const getAds: any = await ProductModel.find({ createdAt: { $lt: yesterday }, status: 1 });
      for (let item of getAds) {
        await ProductModel.updateOne({ _id: item._id }, { $set: { status: 2 } });
        let user: any = await UserModel.findById(item.userId);
      }
    }, null, true, 'Asia/Tehran');
    job.start();
  }
}

export default CronJobs;