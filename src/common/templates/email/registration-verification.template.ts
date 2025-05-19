const emailVerificationTemplate = (verificationLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    }
    .button {
      background-color: #007bff;
      color: #ffffff;
      padding: 12px 20px;
      text-decoration: none;
      font-size: 16px;
      border-radius: 5px;
      display: inline-block;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>Verify Your Email</h2>
    <p>Thank you for signing up! Please click the button below to verify your email address.</p>
    <a href="${verificationLink}" class="button">Verify Email</a>
    <p>If you did not request this, please ignore this email.</p>
  </div>
</body>
</html>
`;

export default emailVerificationTemplate;
