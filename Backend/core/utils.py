import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def send_email(to_email, subject, message_body):
    """Function to send emails using SendGrid"""
    message = Mail(
        from_email='myao1@ufl.edu',  # Replace with your verified email
        to_emails=to_email,
        subject=subject,
        html_content=message_body
    )
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(f"Email sent! Status code: {response.status_code}")
        return response.status_code
    except Exception as e:
        print(f"Error sending email: {e}")
        return None
