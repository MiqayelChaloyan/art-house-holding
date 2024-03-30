import { transporter } from '../../lib/constants/nodemailer';

export default async (req, res) => {
    const { firstName, phone, lastName, email, course, quantity, duration } = req.body;

    try {
        await transporter.sendMail({
            from: email,
            to: process.env.NODEMAILER_EMAIL,
            subject: `Contact form submission from ${firstName} ${lastName}`,
            html: `<p>You have a contact form submission</p><br>
          <p><strong>Email: </strong> ${email}</p><br>
          <p><strong>Phone: </strong> ${phone}</p><br>
          <p><strong>Selected course: </strong> ${course}</p>
          <p><strong>Selected quantity of classes: </strong> ${quantity}</p>
          <p><strong>Selected quantity of classes: </strong> ${duration}</p>
        `
        });

        console.log(firstName, phone, lastName, email, course, quantity, duration);
        
    } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
    }
    return res.status(200).json({ error: '' });
};




