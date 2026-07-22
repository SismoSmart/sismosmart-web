# SismoSmart Web

SismoSmart için `Next.js + TypeScript + Tailwind CSS` temelli, çok dilli public web uygulaması ve operasyon otomasyonları.

## Yerel geliştirme

```bash
npm install
npm run dev
```

Site varsayılan olarak `http://localhost:3000/en` rotasına yönlenir. Şu anda 6 locale hazır:

- `tr`
- `en`
- `es`
- `it`
- `id`
- `pt`

## Arayüz açmadan deploy

Bu repo, shared hosting üstündeki doğrulanmış `SSH + SFTP + CloudLinux Node.js Selector + Passenger` yapısına göre hazırlanıyor.

Önce `.env.example` dosyasını referans alıp kendi `.env` dosyanızdaki değerleri doldurun.

```bash
npm run deploy:status
```

cPanel API üzerinden mevcut Passenger uygulamalarını listeler.

```bash
npm run deploy:register
```

Sunucuda henüz Node uygulaması yoksa CloudLinux selector ile kaydeder.

```bash
npm run deploy:server
```

Bu komut şunları yapar:

1. `next build` çalıştırır.
2. Standalone dağıtım paketini `.deploy/standalone` içine hazırlar.
3. Paketi SSH/SFTP ile sunucuya yükler.
4. `current` release bağlantısını yeni sürüme çevirir.
5. Gerekirse Node app’i kaydeder, varsa yeniden başlatır.

Geri alma için:

```bash
npm run deploy:rollback
```

Deploy sonrası doğrulama için:

```bash
BASE_URL=https://sismosmart.com bash scripts/post-deploy-verify.sh
```

CI/CD ayrıntıları için `docs/cicd-automation.md` dosyasına bakın.

## Notlar

- Üretim yayını şu aşamada bilinçli olarak komut tabanlı ilerler; panel zorunlu değildir.
- Sunucuda Node 22 desteği doğrulandı ve deploy komutları bunu hedefler.
- Repo, çok dilli public ürün/içerik sayfalarını, form API’lerini ve arayüzsüz deploy omurgasını içerir.

