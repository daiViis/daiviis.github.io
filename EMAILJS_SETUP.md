# 📧 EmailJS Setup Guide

EmailJS umožňuje posílat emaily přímo z JavaScriptu bez PHP serveru!

## 🚀 Rychlé nastavení (5 minut)

### 1. Registrace
1. Jdi na [emailjs.com](https://www.emailjs.com/)
2. Klikni **"Sign Up"** 
3. Registruj se přes Google (nejrychlejší s tvým Gmail účtem)

### 2. Připoj Gmail
1. V dashboard klikni **"Add New Service"**
2. Vyber **"Gmail"** 
3. Klikni **"Connect Account"**
4. Přihlas se svým `david.cit1999@gmail.com`
5. Povol přístup
6. **Zkopíruj Service ID** (něco jako `service_xxxxxxx`)

### 3. Vytvoř Email Template  
1. Klikni **"Email Templates"** → **"Create New Template"**
2. Nastav:
   - **Template Name**: `Contact Form`
   - **Subject**: `New Contact from Digital Magic Website`
   - **Content**:
   ```
   Hello David,

   You have a new contact from your website:

   Name: {{from_name}}
   Email: {{from_email}}
   Message: {{message}}

   Best regards,
   Your Website
   ```
3. **Zkopíruj Template ID** (něco jako `template_xxxxxxx`)

### 4. Najdi Public Key
1. Jdi na **"Account"** → **"General"**
2. **Zkopíruj Public Key** (něco jako `iKMl8gJRkNm3LUuJg`)

### 5. Aktualizuj kód
V `script.js` nahraď:

```javascript
// Nahraď tyto hodnoty svými:
emailjs.init("TVE_PUBLIC_KEY");  // Tvůj Public Key

emailjs.send('TVE_SERVICE_ID', 'TVE_TEMPLATE_ID', templateParams)
//          ↑ Tvůj Service ID  ↑ Tvůj Template ID
```

## ✅ Hotovo!

Teď formulář funguje:
- ✅ **Všude** - lokálně, na hostingu, kdekoli
- ✅ **Zdarma** - až 200 emailů/měsíc
- ✅ **Bez serveru** - jen JavaScript
- ✅ **Spolehlivě** - přes Gmail SMTP

## 🎯 Testování

1. Otevři web
2. Vyplň formulář  
3. Klikni "Make It Happen"
4. Email přijde na `david.cit1999@gmail.com`

## 🔧 Řešení problémů

**"Service not configured":**
- Zkontroluj Service ID a Template ID
- Ujisti se, že Template obsahuje správné proměnné

**"Invalid public key":**
- Zkontroluj Public Key v `emailjs.init()`

**Žádný email nepřišel:**
- Zkontroluj spam složku
- Ověř, že Gmail je správně připojený

---

**🎉 Po nastavení smaž soubory:**
- `send_email.php` 
- `test_email.php`
- `server.py`
- `EMAILJS_SETUP.md`

Už je nebudeš potřebovat!