import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_EMAIL)

const msg = {
    to: 'tanishqsingh641@gmail.com',
    from: 'no-reply@tanishqsingh.live',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

const sendMail = async (from: string, to: string, subject: string, text: string, html: string): Promise<boolean> => {
    try {
        await sgMail.send(msg);

        return true;
    } catch (error) {
        return false;
    }
}

export default sendMail;