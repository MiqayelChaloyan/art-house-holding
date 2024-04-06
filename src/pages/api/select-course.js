import { transporter } from '../../lib/constants/nodemailer';

export default async (req, res) => {
    const { fullName, email, phone, course } = req.body;

    try {
        await transporter.sendMail({
            from: email,
            to: process.env.NODEMAILER_EMAIL,
            subject: `Contact form submission from ${fullName}`,
            html: `<p>You have a contact form submission</p><br>
          <p><strong>Email: </strong> ${email}</p><br>
          <p><strong>Phone: </strong> ${phone}</p><br>
          <p><strong>Selected course: </strong> ${course}</p>
        `
        });

        console.log(fullName, email, phone, course);
        
    } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
    }
    return res.status(200).json({ error: '' });
};




