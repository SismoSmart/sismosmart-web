# Ops Automation

Bu repo, pazarlama ve analitik operasyonlarını mümkün olduğunca panelden bağımsız yönetebilmek için küçük bir operasyon katmanı içerir.

## Kullanılan komutlar

```bash
npm run ops:status
npm run ops:google-auth -- listen
npm run ops:ga -- status
npm run ops:gtm -- status
npm run ops:search-console -- status
npm run ops:clarity -- status
```

## Google Auth

İki yol desteklenir:

1. `OAuth refresh token`
2. `Service account`

Varsayılan davranış `GOOGLE_AUTH_MODE=auto` ile önce OAuth'u, o yoksa service account'u kullanmaktır.

### Gerekli env alanları

```bash
GOOGLE_AUTH_MODE=auto
GOOGLE_OAUTH_CLIENT_ID=
GOOGLE_OAUTH_CLIENT_SECRET=
GOOGLE_OAUTH_REFRESH_TOKEN=

# veya
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=
GOOGLE_SERVICE_ACCOUNT_JSON=
```

OAuth genelde GA, GTM ve Search Console'u aynı kullanıcı hesabı altında birlikte yönetmek için daha rahattır.

### Refresh token alma

Bu repo içindeki yardımcı komutla tek seferlik refresh token alınabilir:

```bash
npm run ops:google-auth -- listen
```

Bu komut:

1. Local callback sunucusu açar
2. Google izin URL'sini terminale yazar
3. Tarayıcıdan onay verdiğinizde callback'i yakalar
4. Terminale `GOOGLE_OAUTH_REFRESH_TOKEN` değerini basar

İsterseniz önce sadece URL görmek için:

```bash
npm run ops:google-auth -- url
```

## Google Analytics

```bash
npm run ops:ga -- list-accounts
npm run ops:ga -- list-properties 123456789
npm run ops:ga -- list-web-streams 987654321
npm run ops:ga -- create-property 123456789 "SismoSmart"
npm run ops:ga -- create-web-stream 987654321 https://sismosmart.com/ "SismoSmart Website"
npm run ops:ga -- create-measurement-secret 987654321 1234567890 "SismoSmart automation"
```

## Google Tag Manager

```bash
npm run ops:gtm -- list-accounts
npm run ops:gtm -- list-containers 123456
npm run ops:gtm -- list-workspaces 123456 987654
npm run ops:gtm -- create-workspace 123456 987654 "Automation Workspace"
npm run ops:gtm -- create-version 123456 987654 3 "Automated publish"
npm run ops:gtm -- publish-version accounts/123456/containers/987654/versions/12
```

Not:

- Bu repo şimdilik GTM workspace, version ve publish akışlarını otomatikleştirir.
- Tag/trigger şablon otomasyonu container kurallarına göre değişebildiği için bilinçli olarak daha dar tutuldu.

## Search Console ve Site Verification

```bash
npm run ops:search-console -- list-sites
npm run ops:search-console -- generate-token sismosmart.com
npm run ops:search-console -- verify-domain sismosmart.com
npm run ops:search-console -- submit-sitemap sc-domain:sismosmart.com https://sismosmart.com/sitemap.xml
npm run ops:search-console -- bootstrap-domain sismosmart.com --verify
```

`bootstrap-domain` şunları yapar:

1. Google Site Verification için DNS TXT token üretir
2. cPanel API erişimi varsa TXT kaydını zone dosyasına ekler
3. `--verify` verilirse domain doğrulamasını dener
4. Search Console property ekler
5. Sitemap submit eder

## Clarity

```bash
npm run ops:clarity -- status
npm run ops:clarity -- api-surface
```

Clarity tarafında şu ayrımı bilerek koruyoruz:

- Otomatik yapılabilenler: client API, consent, identify, custom tags, export hazırlığı
- Hâlâ panel gerektirenler: proje oluşturma, ilk tracking code üretimi, ekip yetkileri

Bu yüzden Clarity scripti şu an daha çok durum görünürlüğü ve sınırların netleşmesi için var.
