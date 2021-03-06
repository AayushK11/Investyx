from pathlib import Path
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import os

BASE_PATH = Path(__file__).parent.parent
# WEBSITE_PATH = "http://localhost:3000/"
WEBSITE_PATH = "https://investyx.netlify.app/"


def registration_email(name, email, usercode):
    message = MIMEMultipart("alternative")

    message["subject"] = "Confirm Your Investyx Account"
    message["to"] = email
    message["from"] = "investyx2021@gmail.com"

    html_body = """
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Set Password</title>
        </head>
    <body>
        <main>
        <div style="background-color:#e5e3f7">
            <div style="margin:0px auto;border-radius:6px;max-width:600px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border-radius:6px">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center">
                        <div style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr">
                        <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                            <tbody>
                                <tr>
                                    <td align="left" style="font-size:0px;padding:0;padding-left:20px;word-break:break-word">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                                        <tbody>
                                            <tr>
                                                <td style="width:200px"><a href="{link}"><img alt="Investyx" height="auto" src="cid:image1" style="border:none;border-radius:6px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px" width="135" ></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:6px;max-width:600px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:6px">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:0px;text-align:center">
                        <div style="margin:0px auto;max-width:600px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                            <tbody>
                                <tr>
                                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:25px;padding-right:25px;padding-top:20px;text-align:center">
                                    <div  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:0;word-break:break-word">
                                                <div style="font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:24px;font-weight:600;line-height:1.3;text-align:left;color:#2f363f">Welcome To Investyx.</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div style="margin:0px auto;max-width:600px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                            <tbody>
                                <tr>
                                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-left:25px;padding-right:25px;padding-top:20px;text-align:center">
                                    <div  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:0;word-break:break-word">
                                                <div style="font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:14px;line-height:1;text-align:left;color:#2f363f">
                                                <p  style="color:#535b62;line-height:1.6;margin-bottom:16px">Hi, {fname}!</p>
            
                                                <p  style="color:#535b62;line-height:1.6;margin-bottom:16px">We are happy to finally see you here. <b>You are just one step away from achieving your next financial dream</b>. A few more things, before we start filling your pockets with money.</p>
            
                                                <p  style="color:#535b62;line-height:1.6;margin-bottom:16px">You will have a Unique Usercode : <b>{usercode}</b>. Keep this on person at all times. We mean it!</p>
            
                                                <p  style="color:#535b62;line-height:1.6;margin-bottom:16px">We would need you to create a password for this usercode. Just to be on the safer side.????</p>
            
                                                <p>&nbsp;</p>
                                                </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" style="font-size:0px;padding:0;word-break:break-word">
                                                <div style="font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:14px;line-height:1;text-align:left;color:#2f363f"><u></u><a href="{link}confirm-account/" style="font-size:14px;font-weight:500;font-style:normal;display:inline-block;padding:10px 20px;color:white;text-decoration:none;border-radius:4px;text-align:center;background-color:#6558f5" target="_blank" >Lets Finish Up...</a><u></u></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div style="margin:0px auto;max-width:600px">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center">
                        <div style="margin:0px auto;max-width:600px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                            <tbody>
                                <tr>
                                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:16px;padding-top:16px;text-align:center">
                                   
                                    <div  style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                                        <tbody>
                                        <tr>
                                                <td align="right" style="font-size:0px;padding:0 10px;word-break:break-word">
                                                <div style="font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:14px;font-weight:normal;line-height:20px;text-align:right;color:#535b62">Created By - Aayush, Ajinkya, Aniket</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right" style="font-size:0px;padding:0 10px;word-break:break-word">
                                                <div style="font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:14px;font-weight:normal;line-height:20px;text-align:right;color:#535b62">?? Investyx - 2021</div>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>
        </main>
    </body>
    </html>
    """.format(
        fname=name, usercode=usercode, link=WEBSITE_PATH
    )

    message.attach(MIMEText(html_body, "html"))

    image = open(os.path.join(BASE_PATH, "Images\Investyx_H.png"), "rb")
    logoimage = MIMEImage(image.read(), _subtype="png")
    image.close()
    logoimage.add_header("Content-ID", "<image1>")
    message.attach(logoimage)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = "1qaz1232wsx"
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], message["to"], message.as_string())
    server.quit()


def forgot_password_email(name, email):
    message = MIMEMultipart("alternative")

    message["subject"] = "Forgot Password Link"
    message["to"] = email
    message["from"] = "investyx2021@gmail.com"

    html_body = """
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Forgot Password</title>
        </head>
        <body>
            <main>
            <div style="background-color: #e5e3f7">
                <div style="margin: 0px auto; border-radius: 6px; max-width: 600px">
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%; border-radius: 6px"
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            padding-bottom: 20px;
                            padding-top: 20px;
                            text-align: center;
                        "
                        >
                        <div
                            style="
                            font-size: 0;
                            line-height: 0;
                            text-align: left;
                            display: inline-block;
                            width: 100%;
                            direction: ltr;
                            "
                        >
                            <div
                            style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                            "
                            >
                            <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                            >
                                <tbody>
                                <tr>
                                    <td
                                    align="left"
                                    style="
                                        font-size: 0px;
                                        padding: 0;
                                        padding-left: 20px;
                                        word-break: break-word;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        "
                                    >
                                        <tbody>
                                        <tr>
                                            <td style="width: 200px">
                                            <a href="{link}"
                                                ><img
                                                alt="Investyx"
                                                height="auto"
                                                src="cid:image1"
                                                style="
                                                    border: none;
                                                    border-radius: 6px;
                                                    display: block;
                                                    outline: none;
                                                    text-decoration: none;
                                                    height: auto;
                                                    width: 100%;
                                                    font-size: 14px;
                                                "
                                                width="135"
                                            /></a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div
                style="
                    background: #ffffff;
                    background-color: #ffffff;
                    margin: 0px auto;
                    border-radius: 6px;
                    max-width: 600px;
                "
                >
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                    background: #ffffff;
                    background-color: #ffffff;
                    width: 100%;
                    border-radius: 6px;
                    "
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            padding-top: 0px;
                            text-align: center;
                        "
                        >
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 0px;
                                    padding-left: 25px;
                                    padding-right: 25px;
                                    padding-top: 20px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: middle"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 24px;
                                                font-weight: 600;
                                                line-height: 1.3;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                Forgot Password
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 20px;
                                    padding-left: 25px;
                                    padding-right: 25px;
                                    padding-top: 20px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: middle"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                line-height: 1;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                Hi, {fname}!
                                                </p>

                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                Click the Link Below to Reset your
                                                Investyx Password and get back to
                                                earning huge profits
                                                </p>

                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                <b
                                                    >If this wasn't you, Please fill out
                                                    a Ticket on the Support Page As Soon
                                                    As Possible</b
                                                >
                                                </p>

                                                <p>&nbsp;</p>
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                line-height: 1;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                <u></u
                                                ><a
                                                href="{link}reset-password/"
                                                style="
                                                    font-size: 14px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    display: inline-block;
                                                    padding: 10px 20px;
                                                    color: white;
                                                    text-decoration: none;
                                                    border-radius: 4px;
                                                    text-align: center;
                                                    background-color: #6558f5;
                                                "
                                                target="_blank"
                                                >Reset Password</a
                                                ><u></u>
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div style="margin: 0px auto; max-width: 600px">
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%"
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            text-align: center;
                        "
                        >
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 16px;
                                    padding-top: 16px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: top;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: top"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="right"
                                            style="
                                                font-size: 0px;
                                                padding: 0 10px;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                font-weight: normal;
                                                line-height: 20px;
                                                text-align: right;
                                                color: #535b62;
                                                "
                                            >
                                                Created By - Aayush, Ajinkya, Aniket
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                            align="right"
                                            style="
                                                font-size: 0px;
                                                padding: 0 10px;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                font-weight: normal;
                                                line-height: 20px;
                                                text-align: right;
                                                color: #535b62;
                                                "
                                            >
                                                ?? Investyx - 2021
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </main>
        </body>
    </html>
    """.format(
        fname=name, link=WEBSITE_PATH
    )

    message.attach(MIMEText(html_body, "html"))

    image = open(os.path.join(BASE_PATH, "Images\Investyx_H.png"), "rb")
    logoimage = MIMEImage(image.read(), _subtype="png")
    image.close()
    logoimage.add_header("Content-ID", "<image1>")
    message.attach(logoimage)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = "1qaz1232wsx"
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], message["to"], message.as_string())
    server.quit()


def reset_email(name, email):
    message = MIMEMultipart("alternative")

    message["subject"] = "Password Reset"
    message["to"] = email
    message["from"] = "investyx2021@gmail.com"

    html_body = """
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Reset Password</title>
        </head>
        <body>
            <main>
            <div style="background-color: #e5e3f7">
                <div style="margin: 0px auto; border-radius: 6px; max-width: 600px">
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%; border-radius: 6px"
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            padding-bottom: 20px;
                            padding-top: 20px;
                            text-align: center;
                        "
                        >
                        <div
                            style="
                            font-size: 0;
                            line-height: 0;
                            text-align: left;
                            display: inline-block;
                            width: 100%;
                            direction: ltr;
                            "
                        >
                            <div
                            style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                            "
                            >
                            <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                            >
                                <tbody>
                                <tr>
                                    <td
                                    align="left"
                                    style="
                                        font-size: 0px;
                                        padding: 0;
                                        padding-left: 20px;
                                        word-break: break-word;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        "
                                    >
                                        <tbody>
                                        <tr>
                                            <td style="width: 200px">
                                            <a href="{link}"
                                                ><img
                                                alt="Investyx"
                                                height="auto"
                                                src="cid:image1"
                                                style="
                                                    border: none;
                                                    border-radius: 6px;
                                                    display: block;
                                                    outline: none;
                                                    text-decoration: none;
                                                    height: auto;
                                                    width: 100%;
                                                    font-size: 14px;
                                                "
                                                width="135"
                                            /></a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div
                style="
                    background: #ffffff;
                    background-color: #ffffff;
                    margin: 0px auto;
                    border-radius: 6px;
                    max-width: 600px;
                "
                >
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                    background: #ffffff;
                    background-color: #ffffff;
                    width: 100%;
                    border-radius: 6px;
                    "
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            padding-top: 0px;
                            text-align: center;
                        "
                        >
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 0px;
                                    padding-left: 25px;
                                    padding-right: 25px;
                                    padding-top: 20px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: middle"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 24px;
                                                font-weight: 600;
                                                line-height: 1.3;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                Your Password Was Reset
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 20px;
                                    padding-left: 25px;
                                    padding-right: 25px;
                                    padding-top: 20px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: middle"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                line-height: 1;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                Hi, {fname}!
                                                </p>

                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                Just Wanted to let you know that your
                                                Investyx Account Password was recently
                                                Changed.
                                                </p>

                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                <b
                                                    >If this wasn't you, Please fill out
                                                    a Ticket on the Support Page As Soon
                                                    As Possible</b
                                                >
                                                </p>

                                                <p>&nbsp;</p>
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                line-height: 1;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                <u></u
                                                ><a
                                                href="{link}contactus/"
                                                style="
                                                    font-size: 14px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    display: inline-block;
                                                    padding: 10px 20px;
                                                    color: white;
                                                    text-decoration: none;
                                                    border-radius: 4px;
                                                    text-align: center;
                                                    background-color: #6558f5;
                                                "
                                                target="_blank"
                                                >Support</a
                                                ><u></u>
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div style="margin: 0px auto; max-width: 600px">
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%"
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            text-align: center;
                        "
                        >
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 16px;
                                    padding-top: 16px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: top;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: top"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="right"
                                            style="
                                                font-size: 0px;
                                                padding: 0 10px;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                font-weight: normal;
                                                line-height: 20px;
                                                text-align: right;
                                                color: #535b62;
                                                "
                                            >
                                                Created By - Aayush, Ajinkya, Aniket
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                            align="right"
                                            style="
                                                font-size: 0px;
                                                padding: 0 10px;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                font-weight: normal;
                                                line-height: 20px;
                                                text-align: right;
                                                color: #535b62;
                                                "
                                            >
                                                ?? Investyx - 2021
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </main>
        </body>
    </html>

    """.format(
        fname=name, link=WEBSITE_PATH
    )

    message.attach(MIMEText(html_body, "html"))

    image = open(os.path.join(BASE_PATH, "Images\Investyx_H.png"), "rb")
    logoimage = MIMEImage(image.read(), _subtype="png")
    image.close()
    logoimage.add_header("Content-ID", "<image1>")
    message.attach(logoimage)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = "1qaz1232wsx"
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], message["to"], message.as_string())
    server.quit()


def account_blocked(name, email, usercode):
    print(name, email, usercode)


def smart_stox_email(name, email):
    message = MIMEMultipart("alternative")

    message["subject"] = "Investyx Account Linked"
    message["to"] = email
    message["from"] = "investyx2021@gmail.com"

    html_body = """
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Account Linked</title>
        </head>
        <body>
            <main>
            <div style="background-color: #e5e3f7">
                <div style="margin: 0px auto; border-radius: 6px; max-width: 600px">
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%; border-radius: 6px"
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            padding-bottom: 20px;
                            padding-top: 20px;
                            text-align: center;
                        "
                        >
                        <div
                            style="
                            font-size: 0;
                            line-height: 0;
                            text-align: left;
                            display: inline-block;
                            width: 100%;
                            direction: ltr;
                            "
                        >
                            <div
                            style="
                                font-size: 0px;
                                text-align: left;
                                direction: ltr;
                                display: inline-block;
                                vertical-align: top;
                                width: 100%;
                            "
                            >
                            <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="vertical-align: top"
                                width="100%"
                            >
                                <tbody>
                                <tr>
                                    <td
                                    align="left"
                                    style="
                                        font-size: 0px;
                                        padding: 0;
                                        padding-left: 20px;
                                        word-break: break-word;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                        "
                                    >
                                        <tbody>
                                        <tr>
                                            <td style="width: 75px">
                                            <a href="{link}"
                                                ><img
                                                alt="Investyx"
                                                height="auto"
                                                src="cid:image1" 
                                                style="
                                                    border: none;
                                                    border-radius: 6px;
                                                    outline: none;
                                                    text-decoration: none;
                                                    height: auto;
                                                    width: 100%;
                                                    font-size: 14px;
                                                "
                                                />
                                            </a>
                                            </td>
                                            <td style="width: 30px">
                                            <h2
                                                style="
                                                border-left: 2px solid #535b62;
                                                height: 75px;
                                                margin: 0px 15px;
                                                "
                                            ></h2>
                                            </td>
                                            <td style="width: 75px">
                                            <a href="https://smartstox.netlify.app/"
                                                ><img
                                                alt="Smart Stox"
                                                height="auto"
                                                src="cid:image2" 
                                                style="
                                                    border: none;
                                                    border-radius: 6px;
                                                    outline: none;
                                                    text-decoration: none;
                                                    height: auto;
                                                    width: 100%;
                                                    font-size: 14px;
                                                "
                                                />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div
                style="
                    background: #ffffff;
                    background-color: #ffffff;
                    margin: 0px auto;
                    border-radius: 6px;
                    max-width: 600px;
                "
                >
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                    background: #ffffff;
                    background-color: #ffffff;
                    width: 100%;
                    border-radius: 6px;
                    "
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            padding-top: 0px;
                            text-align: center;
                        "
                        >
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 0px;
                                    padding-left: 25px;
                                    padding-right: 25px;
                                    padding-top: 20px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: middle"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 24px;
                                                font-weight: 600;
                                                line-height: 1.3;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                Welcome To Smart Stox
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 20px;
                                    padding-left: 25px;
                                    padding-right: 25px;
                                    padding-top: 20px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: middle;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: middle"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                line-height: 1;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                Hi, {fname}!
                                                </p>

                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                <b
                                                    >Your Investyx Account Was Recently
                                                    Linked To Smart Stox.</b
                                                >
                                                </p>

                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                What Does This Mean?<br />
                                                Smart Stox is Investyx's Stocks
                                                Prediction Platform. So If This was
                                                You, There is no Cause of Concern.
                                                Feel Free to Start Using The Platform.
                                                </p>

                                                <p
                                                style="
                                                    color: #535b62;
                                                    line-height: 1.6;
                                                    margin-bottom: 16px;
                                                "
                                                >
                                                If This Wasn't You, that's a little
                                                concerning. Please fill out the
                                                support form as soon as possible to
                                                regain control of your account
                                                </p>

                                                <p>&nbsp;</p>
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                            align="left"
                                            style="
                                                font-size: 0px;
                                                padding: 0;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                line-height: 1;
                                                text-align: left;
                                                color: #2f363f;
                                                "
                                            >
                                                <u></u
                                                ><a
                                                href="{link}contactus"
                                                style="
                                                    font-size: 14px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    display: inline-block;
                                                    padding: 10px 20px;
                                                    color: white;
                                                    text-decoration: none;
                                                    border-radius: 4px;
                                                    text-align: center;
                                                    background-color: #6558f5;
                                                "
                                                target="_blank"
                                                >Create a Ticket</a
                                                ><u></u>
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div style="margin: 0px auto; max-width: 600px">
                <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="width: 100%"
                >
                    <tbody>
                    <tr>
                        <td
                        style="
                            direction: ltr;
                            font-size: 0px;
                            padding: 20px 0;
                            text-align: center;
                        "
                        >
                        <div style="margin: 0px auto; max-width: 600px">
                            <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="width: 100%"
                            >
                            <tbody>
                                <tr>
                                <td
                                    style="
                                    direction: ltr;
                                    font-size: 0px;
                                    padding: 20px 0;
                                    padding-bottom: 16px;
                                    padding-top: 16px;
                                    text-align: center;
                                    "
                                >
                                    <div
                                    style="
                                        font-size: 0px;
                                        text-align: left;
                                        direction: ltr;
                                        display: inline-block;
                                        vertical-align: top;
                                        width: 100%;
                                    "
                                    >
                                    <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="vertical-align: top"
                                        width="100%"
                                    >
                                        <tbody>
                                        <tr>
                                            <td
                                            align="right"
                                            style="
                                                font-size: 0px;
                                                padding: 0 10px;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                font-weight: normal;
                                                line-height: 20px;
                                                text-align: right;
                                                color: #535b62;
                                                "
                                            >
                                                Created By - Aayush, Ajinkya, Aniket
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                            align="right"
                                            style="
                                                font-size: 0px;
                                                padding: 0 10px;
                                                word-break: break-word;
                                            "
                                            >
                                            <div
                                                style="
                                                font-family: Inter, -apple-system,
                                                    BlinkMacSystemFont, Segoe UI, Roboto,
                                                    Helvetica, Arial, sans-serif,
                                                    Apple Color Emoji, Segoe UI Emoji,
                                                    Segoe UI Symbol;
                                                font-size: 14px;
                                                font-weight: normal;
                                                line-height: 20px;
                                                text-align: right;
                                                color: #535b62;
                                                "
                                            >
                                                ?? Investyx - 2021
                                            </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </main>
        </body>
        </html>
    """.format(
        fname=name, link=WEBSITE_PATH
    )

    message.attach(MIMEText(html_body, "html"))

    image = open(os.path.join(BASE_PATH, "Images\Investyx_S.png"), "rb")
    logoimage = MIMEImage(image.read(), _subtype="png")
    image.close()
    logoimage.add_header("Content-ID", "<image1>")
    message.attach(logoimage)

    image = open(os.path.join(BASE_PATH, "Images\SmartStox_S.png"), "rb")
    logoimage = MIMEImage(image.read(), _subtype="png")
    image.close()
    logoimage.add_header("Content-ID", "<image2>")
    message.attach(logoimage)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    password = "1qaz1232wsx"
    server.starttls()
    server.login(message["from"], password)
    server.sendmail(message["from"], message["to"], message.as_string())
    server.quit()

