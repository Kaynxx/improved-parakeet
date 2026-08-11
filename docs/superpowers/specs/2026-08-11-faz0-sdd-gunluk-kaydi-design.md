# Faz 0 SDD Süreç Günlüğü Kaydı Tasarımı

## Amaç

`superpowers:executing-plans` isteğiyle yürütülen süreç günlüğü çalışmasını,
doğrulama ve inceleme kanıtlarıyla birlikte ana `SUREC-GUNLUGU.md` dosyasına
kronolojik bir çalışma kaydı olarak eklemek.

## Kapsam

Yalnız ana checkout'taki `SUREC-GUNLUGU.md` güncellenecek. İzole
`codex/surec-gunlugu-plan` branch'indeki kopya, mevcut faz durumları ve diğer
ajanların Faz 2C/Faz 2D kayıtları değiştirilmeyecek.

## Kayıt konumu ve biçimi

Yeni kayıt `## Kronolojik süreç günlüğü` başlığının hemen altına, en yeni kayıt
olarak eklenecek. Kayıt şu bölümleri içerecek:

- amaç;
- kullanılan Superpowers/SDD akışı ve izole worktree kararı;
- implementer, task review, fix round ve final review sonuçları;
- oluşturulan `2b167ab`, `dba9805` ve `37cf426` commitleri;
- UTF-8, yasaklı kalıp, diff kapsamı, typecheck ve lint doğrulamaları;
- lint'in exit 0 ile birlikte 12 mevcut CSS uyarısı verdiği gerçeği;
- Faz 2D'nin bu çalışma tarafından uygulanmadığı, `3c64c45` gerçeğinin yalnız
  eski planla uzlaştırıldığı;
- diğer ajanlar base branch ve ana günlüğü ilerlettiği için merge/PR yapılmayıp
  izole branch'in korunduğu karar;
- sıradaki adım olarak eşzamanlı çalışmalar bittikten sonra içeriklerin
  seçici biçimde uzlaştırılması ve yeniden doğrulanması.

## Koruma kuralları

- Ana günlükteki mevcut metin silinmeyecek veya topluca yeniden yazılmayacak.
- Faz 2C, Faz 2D veya başka bir ürün fazının sahipliği bu çalışmaya
  atfedilmeyecek.
- Çalıştırılmayan test veya yapılmayan merge/PR tamamlanmış gösterilmeyecek.
- Diğer ajanların commitleri ve kullanıcıya ait çalışma ağacı değişiklikleri
  commit kapsamına alınmayacak.

## Doğrulama

- Dosya UTF-8 olarak okunacak.
- Yeni kayıt başlığı ve üç izole branch commit kimliği aranacak.
- `yer_tutucu|0/40|commit.siz` kalıplarının bulunmadığı doğrulanacak.
- `git diff --check -- SUREC-GUNLUGU.md` çalıştırılacak.
- Diff kapsamının yalnız ana `SUREC-GUNLUGU.md` dosyası olduğu doğrulanacak.

## Başarı ölçütü

Yeni bir çalışma oturumunda okuyucu, bu ajanın Faz 0 dokümantasyon işini nasıl
yürüttüğünü, hangi kanıtları ürettiğini, hangi ürün fazlarını uygulamadığını ve
neden merge/PR yapmadığını mevcut kayıtları kaybetmeden anlayabilir.
