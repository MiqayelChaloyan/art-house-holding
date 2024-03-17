import { transporter } from '../../lib/constants/nodemailer';

export default async (req, res) => {
    const { name, email, phone , message} = req.body;
    
    try {
      await transporter.sendMail({
        from: email,
        to: process.env.NODEMAILER_EMAIL,
        subject: `Contact form submission from ${name}`,
        html: `<p>You have a contact form submission</p><br>
          <p><strong>Email: </strong> ${email}</p><br>
          <p><strong>Phone: </strong> ${phone}</p><br>
          <p><strong>Message: </strong> ${message}</p>
        `
      });
      console.log(name, email, phone );
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
    return res.status(200).json({ error: '' });
  };



