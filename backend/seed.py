from app import create_app
from extensions import db
from models import Country, Article, Helpline, Portal, Guide
from datetime import datetime

def seed_db():
    app = create_app()
    with app.app_context():
        # Create all tables
        db.create_all()

        print("Seeding database...")

        # Create Countries safely (avoid duplicates)
        india = Country.query.filter_by(code="IN").first()
        if not india:
            india = Country(name="India", code="IN")
            db.session.add(india)

        ireland = Country.query.filter_by(code="IE").first()
        if not ireland:
            ireland = Country(name="Ireland", code="IE")
            db.session.add(ireland)

        globe = Country.query.filter_by(code="GL").first()
        if not globe:
            globe = Country(name="Global", code="GL")
            db.session.add(globe)

        db.session.commit()

        # Helplines
        if not Helpline.query.first():
            helplines = [
                Helpline(name="National Cyber Crime Reporting Portal Helpline", phone_number="1930", description="24/7 dedicated helpline for reporting financial cyber fraud in India.", country_id=india.id),
                Helpline(name="Garda Confidential Line", phone_number="1800 666 111", description="Confidential reporting of cyber incidents and cybercrime in Ireland.", country_id=ireland.id),
            ]
            db.session.add_all(helplines)

        # Portals
        if not Portal.query.first():
            portals = [
                Portal(name="Cybercrime.gov.in", url="https://cybercrime.gov.in", description="Official portal to report cyber crime in India.", country_id=india.id),
                Portal(name="CERT-In", url="https://www.cert-in.org.in", description="Indian Computer Emergency Response Team handling cybersecurity incidents and issuing security alerts.", country_id=india.id),
                Portal(name="Cyber Volunteer Portal", url="https://cybervolunteer.mha.gov.in", description="Government portal allowing citizens to report unlawful online content and support cyber awareness.", country_id=india.id),
                Portal(name="Sanchar Saathi", url="https://sancharsaathi.gov.in", description="Portal to report telecom fraud, block lost mobile phones, and manage spam communications.", country_id=india.id),
                Portal(name="Maharashtra Cyber", url="https://www.mahacyber.gov.in", description="Cybercrime awareness and reporting portal managed by Maharashtra Cyber Cell.", country_id=india.id),
                Portal(name="Garda Cyber Crime Bureau", url="https://www.garda.ie/en/about-us/our-departments/garda-national-cyber-crime-bureau-gnccb-/", description="Cybercrime investigation unit of the Irish police providing reporting guidance.", country_id=ireland.id),
                Portal(name="National Cyber Security Centre Ireland", url="https://www.ncsc.gov.ie", description="Ireland's national authority responsible for cybersecurity guidance and incident response.", country_id=ireland.id),
                Portal(name="CSIRT-IE Incident Reporting", url="https://www.ncsc.gov.ie/contact/report-an-incident/", description="Official portal to report cybersecurity incidents affecting organisations in Ireland.", country_id=ireland.id),
                Portal(name="Hotline.ie", url="https://www.hotline.ie", description="Irish internet safety hotline to report illegal or harmful online content.", country_id=ireland.id),
                Portal(name="IRISS", url="https://www.iriss.ie", description="Irish cyber threat intelligence and security information sharing service.", country_id=ireland.id),
            ]
            db.session.add_all(portals)

        # -------------------------------------------------------------------
        #  GUIDES — clear old data and re-seed with full content
        # -------------------------------------------------------------------
        Guide.query.delete()
        db.session.commit()

        guides = [
            # ======================== INDIA ========================
            Guide(
                title="Secure Your UPI Payments",
                description="Learn how to protect your UPI account from fraud, phishing, and unauthorized transactions.",
                category="Financial Security",
                country_id=india.id,
                content="""<h2>How to Secure Your UPI</h2>
<p>UPI (Unified Payments Interface) is widely used for instant digital payments. While it is convenient, cybercriminals often exploit users through phishing, fake payment requests, and social engineering. Follow the steps below to keep your UPI account secure.</p>

<h3>1. Set a Strong and Confidential UPI PIN</h3>
<p>Your UPI PIN is the most important security layer.</p>
<p><strong>Steps to follow:</strong></p>
<ul>
<li>Open your UPI app (GPay, PhonePe, Paytm, etc.).</li>
<li>Go to Bank Account / Payment Settings.</li>
<li>Select Change or Reset UPI PIN.</li>
<li>Choose a unique PIN that is not easy to guess.</li>
</ul>
<p><strong>Important:</strong></p>
<ul>
<li>Never share your UPI PIN with anyone.</li>
<li>No bank or official will ever ask for your PIN.</li>
</ul>

<h3>2. Always Verify Payment Requests</h3>
<p>Fraudsters often send "collect requests" pretending to send money.</p>
<p><strong>Steps to stay safe:</strong></p>
<ul>
<li>Carefully read the payment request message.</li>
<li>Check the sender's name and UPI ID.</li>
<li>Decline requests you do not recognize.</li>
</ul>
<p><strong>Remember:</strong> Entering your UPI PIN sends money, not receives it.</p>

<h3>3. Enable App-Level Security</h3>
<p>Add an extra layer of protection to your payment apps.</p>
<ul>
<li>Enable app lock or fingerprint authentication.</li>
<li>Use screen lock on your phone (PIN, fingerprint, or face unlock).</li>
<li>Disable payment access if your phone is lost.</li>
</ul>

<h3>4. Avoid Clicking Suspicious Links</h3>
<p>Cybercriminals often send malicious links via SMS, WhatsApp, or email.</p>
<ul>
<li>Do not click unknown payment links.</li>
<li>Do not install apps sent by strangers.</li>
<li>Verify official websites before entering bank information.</li>
</ul>

<h3>5. Use Only Official UPI Apps</h3>
<p>Download payment apps only from trusted app stores.</p>
<ul>
<li>Install apps only from Google Play Store or Apple App Store.</li>
<li>Avoid modified or unofficial versions of apps.</li>
<li>Check developer name before downloading.</li>
</ul>

<h3>6. Monitor Your Transactions Regularly</h3>
<p>Frequent monitoring helps detect fraud early.</p>
<ul>
<li>Check your bank statements regularly.</li>
<li>Enable SMS and app notifications.</li>
<li>Report suspicious activity immediately.</li>
</ul>

<h3>7. Never Share OTP or Banking Details</h3>
<p>Fraudsters may call pretending to be bank officials. Never share:</p>
<ul>
<li>OTP (One Time Password)</li>
<li>UPI PIN</li>
<li>Debit card details</li>
<li>Net banking passwords</li>
</ul>
<p>Banks never request these details over calls or messages.</p>

<h3>8. Report Fraud Immediately</h3>
<p>If you suspect fraud, report it without delay.</p>
<ul>
<li>Contact your bank immediately.</li>
<li>Call the National Cyber Crime Helpline: <strong>1930</strong>.</li>
<li>Report the incident at <a href="https://cybercrime.gov.in" target="_blank">https://cybercrime.gov.in</a></li>
</ul>
<p>Early reporting increases the chance of recovering lost funds.</p>""",
            ),

            Guide(
                title="Avoid Fake Job Scams",
                description="Protect yourself from fraudulent job offers that steal your money or personal information.",
                category="Fraud Prevention",
                country_id=india.id,
                content="""<h2>How to Avoid Fake Job Scams</h2>
<p>Fake job scams target job seekers through WhatsApp, Telegram, emails, and social media. Fraudsters promise high-paying remote jobs and then steal money or personal data.</p>

<h3>1. Recognize Warning Signs</h3>
<ul>
<li>Job offers that arrive unsolicited via WhatsApp or Telegram.</li>
<li>Promises of unrealistically high pay for simple tasks (liking videos, rating products).</li>
<li>Requests for an upfront "registration fee" or "security deposit."</li>
<li>Vague job descriptions with no company name or address.</li>
</ul>

<h3>2. Verify the Employer</h3>
<ul>
<li>Search for the company on LinkedIn and its official website.</li>
<li>Check if the recruiter's email uses a corporate domain (not Gmail/Yahoo).</li>
<li>Call the company directly using a number from their official website.</li>
</ul>

<h3>3. Never Pay to Get a Job</h3>
<ul>
<li>Legitimate employers never charge fees for hiring.</li>
<li>Do not pay for training materials, background checks, or equipment.</li>
<li>Be skeptical of "task-based" earnings that require initial investment.</li>
</ul>

<h3>4. Protect Your Personal Information</h3>
<ul>
<li>Do not share Aadhaar, PAN, or bank details until you verify the employer.</li>
<li>Never share OTPs or UPI PINs as part of a "verification process."</li>
</ul>

<h3>5. Report Fake Job Scams</h3>
<ul>
<li>Report to <a href="https://cybercrime.gov.in" target="_blank">cybercrime.gov.in</a>.</li>
<li>Call the cyber helpline: <strong>1930</strong>.</li>
<li>Report the social media accounts or phone numbers used by the scammer.</li>
</ul>""",
            ),

            Guide(
                title="Protect Yourself from Digital Arrest Scams",
                description="Understand the 'digital arrest' fraud where scammers impersonate law enforcement to extort money.",
                category="Fraud Prevention",
                country_id=india.id,
                content="""<h2>Digital Arrest Scam Awareness</h2>
<p>In a "digital arrest" scam, fraudsters call or video-call victims pretending to be police, CBI, or customs officers. They claim the victim is involved in illegal activity and demand money to "settle the case."</p>

<h3>1. How the Scam Works</h3>
<ul>
<li>You receive a call claiming a parcel in your name contains illegal items.</li>
<li>The caller transfers you to a fake "officer" on video call.</li>
<li>They show fake ID cards and official-looking backgrounds.</li>
<li>You are told to stay on the call and not tell anyone ("digital arrest").</li>
<li>They demand immediate money transfer to "clear your name."</li>
</ul>

<h3>2. Key Facts to Remember</h3>
<ul>
<li>No law enforcement agency conducts arrests or investigations via video call.</li>
<li>Police will never ask you to transfer money to "prove innocence."</li>
<li>No official will ask you to stay on a call continuously.</li>
<li>Real investigations involve formal notices, not phone threats.</li>
</ul>

<h3>3. What to Do If Targeted</h3>
<ul>
<li>Disconnect the call immediately.</li>
<li>Do not transfer any money.</li>
<li>Call your local police station to verify the claims.</li>
<li>Report on <a href="https://cybercrime.gov.in" target="_blank">cybercrime.gov.in</a> or call <strong>1930</strong>.</li>
</ul>""",
            ),

            Guide(
                title="Avoid Fake Traffic Challan Links",
                description="Stay safe from fake traffic fine SMS messages that steal your banking information.",
                category="Fraud Prevention",
                country_id=india.id,
                content="""<h2>Fake Traffic Challan Scam</h2>
<p>Scammers send SMS messages about unpaid traffic challans with malicious links. Clicking these links can install malware or redirect to fake payment pages that steal banking credentials.</p>

<h3>1. How to Identify Fake Challans</h3>
<ul>
<li>Official traffic challans come from verified government portals, not random numbers.</li>
<li>Check for shortened or suspicious URLs in the message.</li>
<li>Real challans can be verified on official state transport websites.</li>
<li>Fake messages often have grammatical errors or unusual formatting.</li>
</ul>

<h3>2. Safe Verification Steps</h3>
<ul>
<li>Visit the official traffic police website for your state directly.</li>
<li>Enter your vehicle number on the official portal to check real challans.</li>
<li>Use official apps like <strong>mParivahan</strong> or <strong>DigiLocker</strong>.</li>
</ul>

<h3>3. If You Clicked a Fake Link</h3>
<ul>
<li>Disconnect from the internet immediately.</li>
<li>Run an antivirus scan on your device.</li>
<li>Change your banking passwords immediately.</li>
<li>Contact your bank to freeze your account if you entered payment details.</li>
<li>Report at <a href="https://cybercrime.gov.in" target="_blank">cybercrime.gov.in</a> or call <strong>1930</strong>.</li>
</ul>""",
            ),

            Guide(
                title="WhatsApp & Social Media Scam Awareness",
                description="Recognize and avoid common scams on WhatsApp, Instagram, and other social media platforms.",
                category="Social Media Safety",
                country_id=india.id,
                content="""<h2>WhatsApp & Social Media Scam Awareness</h2>
<p>Social media platforms like WhatsApp, Instagram, and Facebook are heavily used by scammers to defraud users through fake offers, impersonation, and malicious links.</p>

<h3>1. Common WhatsApp Scams</h3>
<ul>
<li><strong>OTP Scam:</strong> Someone asks you to share an OTP "sent by mistake" — this hijacks your account.</li>
<li><strong>Investment Groups:</strong> Fake stock/crypto groups that promise guaranteed returns.</li>
<li><strong>Impersonation:</strong> Messages from unknown numbers pretending to be family members asking for money urgently.</li>
<li><strong>Lottery / Gift Scams:</strong> "You won a prize! Click this link to claim."</li>
</ul>

<h3>2. Instagram & Facebook Scams</h3>
<ul>
<li>Fake brand pages offering huge discounts on products.</li>
<li>DMs from "influencer programs" asking for fees to join.</li>
<li>Phishing links in bio or stories redirecting to fake login pages.</li>
</ul>

<h3>3. How to Stay Safe</h3>
<ul>
<li>Never share OTPs with anyone, even if they claim to be from WhatsApp.</li>
<li>Enable two-step verification on all social media accounts.</li>
<li>Verify unusual requests from friends/family by calling them directly.</li>
<li>Don't click links from unknown contacts or groups.</li>
<li>Report and block suspicious accounts immediately.</li>
</ul>

<h3>4. Reporting</h3>
<ul>
<li>Report within the app (Report > Spam/Scam).</li>
<li>Report at <a href="https://cybercrime.gov.in" target="_blank">cybercrime.gov.in</a> or call <strong>1930</strong>.</li>
</ul>""",
            ),

            # ======================== IRELAND ========================
            Guide(
                title="Phishing Email and Text Scam Protection",
                description="Learn how to identify and protect yourself from phishing emails and smishing texts targeting Irish users.",
                category="Fraud Prevention",
                country_id=ireland.id,
                content="""<h2>Phishing Email and Text Scam Protection</h2>
<p>Phishing emails and smishing (SMS phishing) texts are among the most common cyber threats in Ireland. They impersonate banks, Revenue, An Post, and other trusted organisations to steal your credentials.</p>

<h3>1. Recognise Phishing Emails</h3>
<ul>
<li>Check the sender's email address carefully — look for misspellings or unusual domains.</li>
<li>Be suspicious of urgent language: "Your account will be closed in 24 hours!"</li>
<li>Hover over links before clicking to see the real destination URL.</li>
<li>Look for generic greetings like "Dear Customer" instead of your name.</li>
</ul>

<h3>2. Recognise Smishing Texts</h3>
<ul>
<li>Texts claiming to be from Revenue, An Post, or your bank asking you to click a link.</li>
<li>Messages about "failed deliveries" you weren't expecting.</li>
<li>Requests to update payment details via a link sent by SMS.</li>
</ul>

<h3>3. How to Protect Yourself</h3>
<ul>
<li>Never click links in unexpected emails or texts.</li>
<li>Go directly to the organisation's website by typing the URL yourself.</li>
<li>Report phishing emails to your email provider and to the organisation being impersonated.</li>
<li>Enable spam filters on your email and phone.</li>
</ul>

<h3>4. Reporting in Ireland</h3>
<ul>
<li>Report to the Gardaí at your local station or online.</li>
<li>Report to the <a href="https://www.ncsc.gov.ie" target="_blank">National Cyber Security Centre</a>.</li>
<li>Forward phishing emails to the organisation being impersonated.</li>
</ul>""",
            ),

            Guide(
                title="Parcel Delivery Scam Awareness",
                description="Recognise fake delivery notification scams impersonating An Post, DPD, and other courier services.",
                category="Fraud Prevention",
                country_id=ireland.id,
                content="""<h2>Parcel Delivery Scam Awareness</h2>
<p>Scammers send fake delivery notifications via SMS and email, impersonating An Post, DPD, FedEx, and other couriers. These messages contain malicious links designed to steal your payment details.</p>

<h3>1. How These Scams Work</h3>
<ul>
<li>You receive a text or email claiming a parcel delivery failed.</li>
<li>The message asks you to click a link to reschedule or pay a small "redelivery fee."</li>
<li>The link takes you to a fake website that looks like the real courier's site.</li>
<li>You enter payment details which are then stolen by the scammers.</li>
</ul>

<h3>2. How to Spot the Scam</h3>
<ul>
<li>An Post and couriers will never ask for payment via SMS links.</li>
<li>Check the sender's number or email — is it from an official source?</li>
<li>If you aren't expecting a delivery, treat the message with suspicion.</li>
<li>Look for spelling mistakes and unusual domain names.</li>
</ul>

<h3>3. What to Do</h3>
<ul>
<li>Delete the message without clicking any links.</li>
<li>If you clicked a link, change your passwords and contact your bank.</li>
<li>Report to An Post: <strong>fraud@anpost.ie</strong></li>
<li>Report to the Gardaí.</li>
</ul>""",
            ),

            Guide(
                title="Online Banking Fraud Prevention",
                description="Steps to secure your online banking and protect against fraud targeting Irish bank customers.",
                category="Financial Security",
                country_id=ireland.id,
                content="""<h2>Online Banking Fraud Prevention</h2>
<p>Online banking fraud is a growing concern in Ireland. Criminals use various methods including phishing, social engineering, and malware to access your bank accounts.</p>

<h3>1. Secure Your Online Banking</h3>
<ul>
<li>Use strong, unique passwords for your banking apps and websites.</li>
<li>Enable two-factor authentication (2FA) when available.</li>
<li>Never access online banking on public Wi-Fi networks.</li>
<li>Keep your devices and banking apps updated.</li>
</ul>

<h3>2. Recognise Banking Fraud Tactics</h3>
<ul>
<li><strong>Vishing:</strong> Calls from someone claiming to be your bank asking for login details.</li>
<li><strong>Authorised Push Payment (APP) fraud:</strong> Being tricked into transferring money to a criminal's account.</li>
<li><strong>Account takeover:</strong> Criminals gain access to your account through stolen credentials.</li>
</ul>

<h3>3. Important Reminders</h3>
<ul>
<li>Your bank will never ask for your full PIN, password, or one-time codes.</li>
<li>Don't let anyone remotely access your device to "fix" a banking issue.</li>
<li>Always verify unexpected calls by hanging up and calling your bank directly.</li>
</ul>

<h3>4. Reporting</h3>
<ul>
<li>Contact your bank immediately if you suspect fraud.</li>
<li>Report to the Gardaí.</li>
<li>Contact <a href="https://www.fraudsmart.ie" target="_blank">FraudSMART</a> for guidance.</li>
</ul>""",
            ),

            Guide(
                title="Phone Impersonation Scam Awareness",
                description="Protect yourself from callers impersonating Gardaí, Revenue, or utility companies to extort money.",
                category="Fraud Prevention",
                country_id=ireland.id,
                content="""<h2>Phone Impersonation Scam Awareness</h2>
<p>Impersonation phone scams are increasingly common in Ireland. Callers pretend to be from Revenue, the Gardaí, utility companies, or tech support to trick you into handing over money or personal information.</p>

<h3>1. Common Impersonation Scams</h3>
<ul>
<li><strong>Revenue scam:</strong> Caller claims you owe tax and threatens legal action.</li>
<li><strong>Garda scam:</strong> Caller claims your identity was used in a crime and demands immediate payment.</li>
<li><strong>Utility scam:</strong> Caller threatens to cut off your electricity or broadband unless you pay immediately.</li>
<li><strong>Tech support scam:</strong> Caller claims your computer has a virus and asks for remote access.</li>
</ul>

<h3>2. How to Protect Yourself</h3>
<ul>
<li>Revenue and Gardaí will never demand immediate payment over the phone.</li>
<li>Never give remote access to your computer based on an unsolicited call.</li>
<li>Hang up and call back using the official number from the organisation's website.</li>
<li>Be suspicious of calls demanding payment via gift cards, Bitcoin, or wire transfer.</li>
</ul>

<h3>3. Reporting</h3>
<ul>
<li>Report to the Gardaí.</li>
<li>Report to <a href="https://www.comreg.ie" target="_blank">ComReg</a> for nuisance or scam calls.</li>
</ul>""",
            ),

            # ======================== GLOBAL ========================
            Guide(
                title="Identify Phishing Emails",
                description="Learn to spot fraudulent emails designed to steal your personal information and credentials.",
                category="Cyber Awareness",
                country_id=globe.id,
                content="""<h2>How to Identify Phishing Emails</h2>
<p>Phishing emails are fraudulent messages designed to trick you into revealing personal information, passwords, or financial details. Learning to spot them is your first line of defense against cybercrime.</p>

<h3>1. Check the Sender's Email Address</h3>
<ul>
<li>Look for misspellings (e.g., support@amaz0n.com instead of support@amazon.com).</li>
<li>Legitimate companies use their official domain — be suspicious of free email services.</li>
</ul>

<h3>2. Look for Urgency and Threatening Language</h3>
<ul>
<li>"Your account will be suspended in 24 hours!"</li>
<li>"Unauthorized login detected — verify now!"</li>
<li>Legitimate organizations rarely use threatening language.</li>
</ul>

<h3>3. Inspect Links Before Clicking</h3>
<ul>
<li>Hover over links to see their true destination.</li>
<li>Look for HTTPS and valid domain names in the URL.</li>
<li>When in doubt, navigate to the website directly.</li>
</ul>

<h3>4. Watch for Grammar Errors</h3>
<ul>
<li>Poor grammar, awkward phrasing, or inconsistent branding.</li>
<li>Generic greetings like "Dear Customer" instead of your name.</li>
</ul>

<h3>5. Never Download Unexpected Attachments</h3>
<ul>
<li>Attachments can contain malware, ransomware, or keyloggers.</li>
<li>Be cautious of .exe, .zip, or .scr file types.</li>
</ul>

<h3>6. Report Suspected Phishing</h3>
<ul>
<li>Mark the email as spam or phishing in your email client.</li>
<li>Forward to your IT/security team.</li>
<li>Report to national cybercrime authorities.</li>
</ul>""",
            ),

            Guide(
                title="Strong Password Practices",
                description="Best practices for creating and managing strong passwords to protect your online accounts.",
                category="Account Security",
                country_id=globe.id,
                content="""<h2>Strong Password Practices</h2>
<p>Weak passwords are one of the most common entry points for cybercriminals. Follow these practices to keep your accounts secure.</p>

<h3>1. Create Strong Passwords</h3>
<ul>
<li>Use at least 12–16 characters.</li>
<li>Combine uppercase, lowercase, numbers, and special characters.</li>
<li>Avoid using personal information (name, birthday, pet's name).</li>
<li>Don't use common words or patterns like "password123" or "qwerty."</li>
</ul>

<h3>2. Use Unique Passwords for Every Account</h3>
<ul>
<li>Never reuse passwords across multiple sites.</li>
<li>If one account is breached, unique passwords prevent domino-effect compromises.</li>
</ul>

<h3>3. Use a Password Manager</h3>
<ul>
<li>Password managers generate and store complex passwords securely.</li>
<li>Popular options: Bitwarden, 1Password, LastPass, KeePass.</li>
<li>You only need to remember one master password.</li>
</ul>

<h3>4. Enable Two-Factor Authentication (2FA)</h3>
<ul>
<li>Use authenticator apps (Google Authenticator, Authy) over SMS when possible.</li>
<li>2FA ensures that even if your password is stolen, your account stays protected.</li>
</ul>

<h3>5. Change Passwords After a Breach</h3>
<ul>
<li>Check if your email appears on <a href="https://haveibeenpwned.com" target="_blank">Have I Been Pwned</a>.</li>
<li>Change passwords immediately for any compromised accounts.</li>
</ul>""",
            ),

            Guide(
                title="Protect Social Media Accounts",
                description="Best practices for securing your social media profiles from hackers and identity theft.",
                category="Social Media Safety",
                country_id=globe.id,
                content="""<h2>Protecting Your Social Media Accounts</h2>
<p>Social media accounts contain personal information that hackers can exploit for identity theft, fraud, or harassment. Securing your profiles is essential.</p>

<h3>1. Use Strong, Unique Passwords</h3>
<ul>
<li>Use at least 12 characters with a mix of character types.</li>
<li>Never reuse passwords across platforms.</li>
<li>Use a password manager to keep track.</li>
</ul>

<h3>2. Enable Two-Factor Authentication</h3>
<ul>
<li>Go to your account's Security Settings and enable 2FA.</li>
<li>Use an authenticator app rather than SMS when possible.</li>
</ul>

<h3>3. Review Privacy Settings</h3>
<ul>
<li>Set your profile to private or friends-only.</li>
<li>Limit who can send you friend/follow requests.</li>
<li>Disable location sharing on posts.</li>
</ul>

<h3>4. Be Cautious of Third-Party App Permissions</h3>
<ul>
<li>Review and revoke access for apps you no longer use.</li>
<li>Only authorize trusted applications.</li>
</ul>

<h3>5. Recognize Social Engineering</h3>
<ul>
<li>Don't click links from unknown profiles or DMs.</li>
<li>Verify unusual requests from friends by calling them directly.</li>
<li>Report fake profiles and suspicious messages.</li>
</ul>""",
            ),

            Guide(
                title="Safe Online Shopping",
                description="Tips for secure transactions, verifying sellers, and protecting payment details while shopping online.",
                category="Financial Security",
                country_id=globe.id,
                content="""<h2>Safe Online Shopping Practices</h2>
<p>Online shopping offers great convenience, but it also exposes you to risks like payment fraud, fake sellers, and identity theft.</p>

<h3>1. Shop on Trusted Websites Only</h3>
<ul>
<li>Look for HTTPS in the URL and a padlock icon.</li>
<li>Avoid deals from unknown websites or social media ads.</li>
<li>Research seller reviews and ratings before purchasing.</li>
</ul>

<h3>2. Use Secure Payment Methods</h3>
<ul>
<li>Use credit cards or trusted payment services instead of debit cards.</li>
<li>Enable two-factor authentication for payment accounts.</li>
<li>Never share your CVV, OTP, or PIN via email or phone.</li>
</ul>

<h3>3. Beware of Deals Too Good to Be True</h3>
<ul>
<li>Compare prices across multiple platforms.</li>
<li>Be skeptical of 90% off deals from unknown sellers.</li>
<li>Check if the website has a valid return and refund policy.</li>
</ul>

<h3>4. Keep Your Devices Updated</h3>
<ul>
<li>Update your browser, OS, and antivirus regularly.</li>
<li>Use secure Wi-Fi — avoid shopping on public networks.</li>
</ul>

<h3>5. Monitor Your Statements</h3>
<ul>
<li>Review bank and credit card statements frequently.</li>
<li>Set up transaction alerts via SMS or email.</li>
<li>Report any unfamiliar charges immediately.</li>
</ul>""",
            ),

            Guide(
                title="What to Do After Cyber Fraud",
                description="Immediate steps to take when you discover unauthorized access to your accounts or fall victim to cyber fraud.",
                category="Incident Response",
                country_id=globe.id,
                content="""<h2>What to Do After Cyber Fraud</h2>
<p>Discovering that you've been a victim of cyber fraud can be alarming. Taking immediate and systematic action can help minimize damage and increase your chances of recovery.</p>

<h3>1. Change Your Passwords Immediately</h3>
<ul>
<li>Use a strong, unique password you haven't used before.</li>
<li>If you can't log in, use the "Forgot Password" option.</li>
<li>Change passwords on all accounts that shared the same password.</li>
</ul>

<h3>2. Enable Two-Factor Authentication</h3>
<ul>
<li>Set up 2FA immediately after regaining access.</li>
<li>Use authenticator apps rather than SMS.</li>
<li>Save backup codes in a secure location.</li>
</ul>

<h3>3. Review Account Activity</h3>
<ul>
<li>Check login history and active sessions.</li>
<li>Log out of all devices from security settings.</li>
<li>Look for unauthorized posts, messages, or transactions.</li>
</ul>

<h3>4. Contact Your Bank</h3>
<ul>
<li>Report unauthorized transactions immediately.</li>
<li>Request a temporary freeze on your card or account.</li>
<li>Dispute fraudulent charges formally.</li>
</ul>

<h3>5. Notify Your Contacts</h3>
<ul>
<li>Inform friends and family that your account was compromised.</li>
<li>Warn them not to click any links from messages sent during the breach.</li>
</ul>

<h3>6. Scan Your Devices</h3>
<ul>
<li>Run a full antivirus scan on all devices.</li>
<li>Remove suspicious applications or browser extensions.</li>
<li>Update your operating system and software.</li>
</ul>

<h3>7. Report to Authorities</h3>
<ul>
<li>Report to the platform's support team.</li>
<li>File a complaint with your national cybercrime authority.</li>
<li>In India: call <strong>1930</strong> or visit <a href="https://cybercrime.gov.in" target="_blank">cybercrime.gov.in</a></li>
<li>In Ireland: report to the Gardaí or <a href="https://www.ncsc.gov.ie" target="_blank">NCSC</a>.</li>
</ul>
<p>Early reporting increases the chance of recovering lost funds and preventing further damage.</p>""",
            ),
        ]

        db.session.add_all(guides)
        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()
