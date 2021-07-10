import axios from 'axios';

class SMS {
  static async getToken() {
    try {
      let result: any = await axios({
        method: 'post',
        url: 'https://RestfulSms.com/api/Token',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          "UserApiKey": process.env.SMS_API_KEY,
          "SecretKey": process.env.SMS_SECRETE_KEY
        })
      });
      return result.TokenKey;
    } catch (err) {
      console.log(err);
    }
  }

  static async send(text: string, phoneNumber: string, token: string) {
    try {
      let result: any = await axios({
        method: 'post',
        url: 'https://RestfulSms.com/api/Token',
        headers: {
          'Content-Type': 'application/json',
          'x-sms-ir-secure-token': token,
        },
        data: JSON.stringify({
          "Messages": [text],
          "MobileNumbers": [phoneNumber],
          "LineNumber": "3000123456789",
          "SendDateTime": "",
          "CanContinueInCaseOfError": "false"
        })
      });
      return result.TokenKey;
    } catch (err) {
      console.log(err);
    }
  }
}

