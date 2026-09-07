# PolisenseAI Landing Page & LinkedIn Sanity Check

## Domain

**Official PolisenseAI domain:**

```text
https://polisenseai.com/
```

The issue being investigated is a **LinkedIn "suspicious page" warning** associated with the PolisenseAI website.

---

## 1. Understand the LinkedIn Warning

LinkedIn may display the website through a redirect such as:

```text
https://www.linkedin.com/redir/suspicious-page?url=polisenseai.com
```

This means LinkedIn's security system is warning about the destination URL.

Possible explanations include:

* LinkedIn's safety providers or internal heuristics have flagged the domain.
* The warning is a false positive, potentially related to the domain being new or having low traffic.

There is no indication from the information currently available that `polisenseai.com` is a confirmed phishing or malware domain.

---

# 2. Check the Domain Reputation

Run the following checks for:

```text
polisenseai.com
```

### Google Safe Browsing

Go to:

```text
https://transparencyreport.google.com/safe-browsing/search
```

Search for:

```text
https://polisenseai.com
```

### VirusTotal

Go to:

```text
https://www.virustotal.com/gui/domain/polisenseai.com
```

Check the domain reputation.

### Spamhaus

Go to:

```text
https://check.spamhaus.org/
```

Search for:

```text
polisenseai.com
```

If any service reports a problem, follow that provider's remediation or delisting process.

---

# 3. Check the Website Directly

Open:

```text
https://polisenseai.com/
```

Check it in an incognito/private browser window.

Verify that:

* The website loads correctly.
* HTTPS works without browser warnings.
* There are no unexpected redirects.
* There are no suspicious pop-ups.
* There are no suspicious external scripts.
* There are no broken or unfinished-looking pages.

---

# 4. Important LinkedIn Detail

The issue is **not related to a LinkedIn post**.

The warning appears directly on the **PolisenseAI LinkedIn Company Page**, in the company page header/cover area, where the website link is displayed.

LinkedIn may be generating a URL similar to:

```text
https://www.linkedin.com/redir/suspicious-page?url=Polisense%2eAI
```

The important part is:

```text
url=Polisense%2eAI
```

`%2e` represents a period.

Therefore LinkedIn is interpreting the destination as:

```text
Polisense.AI
```

while the actual website is:

```text
https://polisenseai.com/
```

These are different domains.

---

# 5. Check the LinkedIn Company Page Website

From the LinkedIn Company Page administrator view:

```text
Company Page
→ Edit Page
→ Page Info
→ Website URL
```

Check the current website URL.

It should be:

```text
https://polisenseai.com/
```

If another value is present, replace it with the correct domain and save.

---

# 6. Check the LinkedIn Page Button

The Company Page may also have a separate website/CTA button.

Check:

```text
Edit Page
→ Buttons / Custom Button
```

Look for the relevant website button, such as:

* Visit website
* Learn more
* Contact us

Check the URL associated with the button.

It should point to:

```text
https://polisenseai.com/
```

---

# 7. Check the Result After Updating

After saving the LinkedIn settings:

1. Open the PolisenseAI Company Page.
2. Check the page in an incognito/private browser.
3. Check the page while logged out.
4. Check whether the warning is still displayed.
5. Check whether LinkedIn is still referencing `Polisense.AI` instead of `polisenseai.com`.

If necessary, remove the website URL, save the page, and then add:

```text
https://polisenseai.com/
```

again.

---

# 8. If the Warning Remains

If the LinkedIn Company Page is configured with:

```text
https://polisenseai.com/
```

but LinkedIn continues displaying:

```text
Polisense.AI
```

or:

```text
linkedin.com/redir/suspicious-page
```

then contact LinkedIn support and report the issue.

Explain that:

* `polisenseai.com` is the official PolisenseAI startup domain.
* The LinkedIn Company Page is incorrectly displaying a suspicious-page warning.
* The configured destination should be `https://polisenseai.com/`.
* The warning appears to reference `Polisense.AI`, which is different from the actual domain.
* You have checked the domain through Safe Browsing, VirusTotal, and Spamhaus.

LinkedIn Help:

```text
https://www.linkedin.com/help/linkedin/answer/a1341680
```

---

# 9. Fix the Company Page fields
From your LinkedIn Company Page, use the administrator view:

Open the Polisense AI Company Page.

Click Edit page or Admin tools → Edit page.

Open Page info.

Find Website URL.

Replace the existing value with exactly:

text
https://polisenseai.com/
Save the changes.