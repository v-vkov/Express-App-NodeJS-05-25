const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (fromEmail, recipients, subject, content) => {
    const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: recipients,
        subject: subject,
        html: content,
      });
    
      if (error) {
        console.error({ error });
        throw new Error(error);
      }
  
      return data;
}

module.exports = {
    sendEmail
};