const nodemailer = require('nodemailer');
const fs = require('fs');
const readline = require('readline');

const html = `<h1>i am checking okay gandu</h1>
<p>${new Date()}</p>`;

const emailListFilePath = 'emailList.txt'; // Path to your email list file

async function getEmailsFromFile(filePath) {
  const emails = [];
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    // Assuming each line in the file contains a single email address
    emails.push(line.trim());
  }

  return emails;
}

async function main() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'user@gmail.com',
        pass: 'go to your app password get 16 character pass',
      },
    });

    const emails = await getEmailsFromFile(emailListFilePath);

    const pdfAttachment = {
      filename: 'example.pdf',
      path: './example.pdf',
    };

    const info = await transporter.sendMail({
      from: 'Roshan <ya its me>',
      to: 'firts@gmail.com', // The primary recipient
      bcc: emails.slice(1).join(', '), // Use BCC for the remaining recipients
      subject: 'Test email from roshan',
      html: html,
      attachments: [pdfAttachment],
    });

    console.log("Message sent: " + info.messageId);
  } catch (e) {
    console.error('Error:', e);
  }
}

main();
