# SismoSmart Web

SismoSmart için `Next.js + TypeScript + Tailwind CSS` temelli, çok dilli public web uygulaması ve operasyon otomasyonları.

## Production-only doğrulama

Bu repository için kalıcı yerel secret akışı kullanılmaz. Production build ve
kalite kapıları açıkça `ci` Doppler config'ini seçer:

```bash
npm ci
npm run doppler:ci
```

Browser smoke testleri izole süreç içinde `http://localhost:3000/en` rotasını
kullanabilir; bu bir local secret veya ayrı development config gerektirmez.

## Arayüz açmadan deploy

Bu repo, shared hosting üstündeki doğrulanmış `SSH + SFTP + CloudLinux Node.js Selector + Passenger` yapısına göre hazırlanıyor.

`.env.example` yalnızca boş değerli public schema dosyasıdır. Production status kontrolü explicit `prd_ops` config ile çalışır:

```bash
npm run doppler:ops:status
```

cPanel API üzerinden mevcut Passenger uygulamalarını listeler.

```bash
node scripts/doppler/run.mjs prd_deploy -- npm run deploy:register
```

Sunucuda henüz Node uygulaması yoksa CloudLinux selector ile kaydeder.

```bash
node scripts/doppler/run.mjs prd_deploy -- npm run deploy:server
```

Bu komut şunları yapar:

1. `next build` çalıştırır.
2. Standalone dağıtım paketini `.deploy/standalone` içine hazırlar.
3. Paketi SSH/SFTP ile sunucuya yükler.
4. `current` release bağlantısını yeni sürüme çevirir.
5. Gerekirse Node app’i kaydeder, varsa yeniden başlatır.

Geri alma için:

```bash
node scripts/doppler/run.mjs prd_deploy -- npm run deploy:rollback
```

Deploy öncesi non-activating doğrulama için:

```bash
npm run doppler:deploy:validate
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

