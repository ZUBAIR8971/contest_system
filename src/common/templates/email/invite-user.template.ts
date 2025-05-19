const inviteUserTemplate = (inviterName: string, registrationLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .button {
      background-color: #28a745;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      font-size: 16px;
      border-radius: 5px;
      display: inline-block;
      margin-top: 20px;
    }
    .message {
      font-size: 16px;
      color: #333333;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h2>You're Invited to Join AI Haus!</h2>
    <p class="message"><strong>${inviterName}</strong> has invited you to join them on <strong>AI Haus</strong>.</p>
    <p class="message">Click the button below to create your account and get started.</p>
    <a href="${registrationLink}" class="button">Register Now</a>
    <p class="message">If you weren't expecting this invitation, feel free to ignore this email.</p>
  </div>
</body>
</html>
`;

export default inviteUserTemplate;
