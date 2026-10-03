Aynen chat, bu projede de seni **“kodu kopyala-yapıştır” şeklinde değil, projeyi gerçekten tasarlayan junior developer gibi** götürelim. Ben senior gibi sana her aşamada **ne yapacağını, neden yaptığını, hangi TypeScript konusunu kullandığını ve aşamanın sonunda neyin çalışması gerektiğini** söyleyeceğim. **Sen istemeden kod vermeyeceğim.**

Bu proje geçen haftaki TypeScript uygulamasından bir tık daha ciddi çünkü burada sadece class oluşturmayacağız; **Client → Project → Task → Invoice ilişkisini düzgün bir domain yapısı halinde kuracağız.**

# Freelance Project & Client Management System — Yol Haritamız

## AŞAMA 0 — Projeyi Kur ve Mimariyi Hazırla

İlk aşamada hiçbir business logic yazmayacağız. Önce temiz bir TypeScript projesi oluşturacağız.

Proje yapımız yaklaşık şöyle olacak:

```text
FreelanceManagementSystem/
│
├── src/
│   ├── types/
│   │   ├── CommonTypes.ts
│   │   ├── ClientTypes.ts
│   │   ├── ProjectTypes.ts
│   │   ├── TaskTypes.ts
│   │   └── InvoiceTypes.ts
│   │
│   ├── interfaces/
│   │   ├── IClient.ts
│   │   ├── IProject.ts
│   │   ├── ITask.ts
│   │   ├── IInvoice.ts
│   │   └── IReport.ts
│   │
│   ├── models/
│   │   ├── Client.ts
│   │   ├── Project.ts
│   │   ├── Task.ts
│   │   └── Invoice.ts
│   │
│   ├── services/
│   │   ├── ClientManager.ts
│   │   ├── ProjectManager.ts
│   │   └── InvoiceManager.ts
│   │
│   ├── utils/
│   │   └── ReportGenerator.ts
│   │
│   └── index.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

Buradaki önemli ayrım şu:

**models/** → verinin kendisi.

**services/** → bu veriler üzerinde işlem yapan sınıflar.

**types/** → hangi değerlerin kabul edildiğini belirleyen custom type'lar.

**interfaces/** → nesnelerin sahip olması gereken yapıyı tanımlar.

**utils/** → raporlama gibi yardımcı işlemler.

**index.ts** → senaryoyu çalıştıracağımız ana dosya.

Aşama sonunda sadece proje ayağa kalkmış olacak.

---

# AŞAMA 1 — Domain'i Tasarla

Kod yazmadan önce şu dört ana varlığın ilişkisini kafamızda netleştireceğiz:

```text
CLIENT
  │
  └── PROJECT
        │
        ├── TASK
        ├── TASK
        ├── TASK
        │
        └── INVOICE
```

Burada önemli mimari kararımız şu olacak:

Bir **Client** birden fazla **Project** sahibi olabilir.

Bir **Project** yalnızca bir Client'a ait olur.

Bir **Project** birden fazla **Task** içerir.

Bir **Project** için birden fazla Invoice oluşturulabilir.

Yani aslında:

```text
Client     1 ---- N Project
Project    1 ---- N Task
Project    1 ---- N Invoice
```

Burada özellikle sana **“hangi nesne hangi bilgiyi gerçekten taşımalı?”** mantığını oturtacağım.

Mesela Task'ın Client bilgisi taşımasına gerek yok.

Çünkü:

```text
Task
 ↓
Project
 ↓
Client
```

zaten Client'a ulaşabiliyoruz.

Bu düşünme şekli ileride backend ve database tasarımında çok işine yarayacak.

| İlişki            | Karar                      |
| ----------------- | -------------------------- |
| Client → Project  | 1 → N                      |
| Project → Client  | N → 1                      |
| Project → Task    | 1 → N                      |
| Task → Client     | Doğrudan ilişki yok        |
| Project → Invoice | 1 → N                      |
| Invoice → Client  | Project üzerinden ulaşılır |

| #   | İşlem                                    | Sen | Asıl sorumluluk             | Eklenecek dosya                                              | Neden?                                                                                    |
| --- | ---------------------------------------- | --- | --------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| 1   | Yeni müşteri oluştur                     | C   | **ClientManager**           | `src/services/ClientManager.ts`                              | Sisteme yeni Client ekleniyor                                                             |
| 2   | Müşteriye proje ata                      | P   | **ProjectManager + Client** | `src/services/ProjectManager.ts` + `src/models/Client.ts`    | Manager geçerli Client'ı kontrol eder, Client kendi proje bilgisini taşır                 |
| 3   | Projeye görev ekle                       | T   | **Project**                 | `src/models/Project.ts`                                      | Task kendi kendini projeye ekleyemez; Project task listesini yönetir                      |
| 4   | Görevin durumunu değiştir                | T   | **Task** ✅                 | `src/models/Task.ts`                                         | Task kendi durumunu yönetebilir                                                           |
| 5   | Projenin durumunu değiştir               | P   | **Project** ✅              | `src/models/Project.ts`                                      | Project kendi status'unu yönetir                                                          |
| 6   | Toplam tahmini çalışma saatini hesapla   | P   | **Project** ✅              | `src/models/Project.ts`                                      | Project kendi Task'larını bildiği için                                                    |
| 7   | Müşterinin toplam proje değerini hesapla | C   | **Client** ✅               | `src/models/Client.ts`                                       | Client kendi projelerini taşıyacağı için toplam değeri hesaplayabilir                     |
| 8   | Proje için fatura oluştur                | I   | **InvoiceManager**          | `src/services/InvoiceManager.ts`                             | Önce Project'in gerçekten var olduğunu doğrulamak gerekir                                 |
| 9   | Faturayı ödendi yap                      | I   | **Invoice** ✅              | `src/models/Invoice.ts`                                      | Tek faturanın kendi davranışıdır                                                          |
| 10  | Tüm müşterileri listele                  | C   | **ClientManager**           | `src/services/ClientManager.ts`                              | Bir Client diğer Client'ları bilmez                                                       |
| 11  | Aktif projeleri listele                  | P   | **ProjectManager**          | `src/services/ProjectManager.ts`                             | Bütün Project koleksiyonunda filtreleme yapılır                                           |
| 12  | Tamamlanan projeleri listele             | P   | **ProjectManager**          | `src/services/ProjectManager.ts`                             | Bütün projeler arasında filtreleme yapılır                                                |
| 13  | Gecikmiş projeleri bul                   | P   | **ProjectManager**          | `src/services/ProjectManager.ts`                             | Birden fazla proje deadline ve status bilgisine göre kontrol edilir                       |
| 14  | Belirli müşterinin projelerini getir     | C   | **Client / ProjectManager** | `src/models/Client.ts` veya `src/services/ProjectManager.ts` | Client kendi projelerini taşıyabilir; sistem genelinde sorgu gerekirse Manager kullanılır |
| 15  | En yüksek bütçeli projeyi bul            | P   | **ProjectManager**          | `src/services/ProjectManager.ts`                             | Bütün projelerin budget değerleri karşılaştırılır                                         |
| 16  | Toplam kazanılan parayı hesapla          | I   | **InvoiceManager**          | `src/services/InvoiceManager.ts`                             | Bütün paid Invoice'ların toplamı gerekir                                                  |
| 17  | Ödenmemiş faturaları listele             | I   | **InvoiceManager**          | `src/services/InvoiceManager.ts`                             | Invoice koleksiyonu status değerine göre filtrelenir                                      |
| 18  | Projelerin detaylı özetini oluştur       | P   | **ReportGenerator**         | `src/utils/ReportGenerator.ts`                               | Bu bir domain davranışı değil, çıktı/raporlama sorumluluğudur                             |

---

# AŞAMA 2 — Custom Type'ları Oluştur

İlk gerçek TypeScript konusu burada başlayacak.

Henüz class yok.

Önce sistemde serbest bırakmak istemediğimiz değerleri belirleyeceğiz.

Örneğin:

```text
ClientStatus

ProjectStatus

TaskStatus

TaskPriority

InvoiceStatus
```

Böylece biri gelip:

```text
Project Status = "uçuyor"
```

gibi saçma bir değer veremeyecek. 😄

Project için düşün:

```text
planned
active
completed
cancelled
```

Task:

```text
todo
in-progress
completed
```

Priority:

```text
low
medium
high
critical
```

Invoice:

```text
unpaid
paid
cancelled
```

Burada hedefimiz minimum **5 custom type** şartını daha başlangıçta düzgün şekilde karşılamak.

Ayrıca ID için de ortak bir type tasarlayıp tasarlamayacağımızı konuşacağız.

---

# AŞAMA 3 — Interface Katmanını Oluştur

Şimdi şunu tanımlayacağız:

> “Bir Client nasıl görünmek zorunda?”

Henüz gerçek Client üretmiyoruz.

Sadece contract oluşturuyoruz.

Örneğin zihinsel olarak:

```text
IClient

id
name
email
companyName
status
```

Aynı şekilde:

```text
IProject
ITask
IInvoice
```

Fakat projede minimum 5 interface istendiği için bir tane daha ekleyeceğiz.

Ben burada `IReport` veya benzeri bir rapor interface'i kullanmayı daha mantıklı buluyorum.

Bu aşamada interface ile class farkını özellikle oturtacağız:

```text
Interface
   ↓
"Nasıl görünmeli?"

Class
   ↓
"Nasıl davranmalı?"
```

Bu ayrımı anlaman çok önemli.

---

# AŞAMA 4 — Task Modelini Oluştur

Model geliştirmeye en küçük nesneden başlayacağız.

Yani önce:

```text
Task
```

Çünkü Task'ın başka bir modele bağımlılığı çok az.

Burada ilk defa şunları gerçekten kullanacağız:

```text
class
constructor
properties
private
public
interface implementation
```

Task'ın temel sorumlulukları:

```text
Task oluşturmak
Task durumunu değiştirmek
Task tamamlandı mı kontrol etmek
```

Önemli nokta:

Task'ın status değerini herkesin dışarıdan kafasına göre değiştirmesine izin vermeyeceğiz.

Burada **encapsulation** mantığı başlayacak.

Yani:

```text
task.status = ...
```

yerine kontrollü davranış tasarlamayı öğreneceğiz.

---

# AŞAMA 5 — Client Modelini Oluştur

Şimdi Client class'ını oluşturacağız.

Client artık sadece:

```text
id
name
email
companyName
status
```

taşımayacak.

Proje gereksiniminde özellikle:

> Client kendi proje bilgisini taşıyabilecek.

denmiş.

Dolayısıyla Client ile Project arasında ilişki kurmamız gerekiyor.

Ama burada circular dependency gibi konulara bulaşmadan temiz bir tasarım yapacağız.

Client şu tarz sorumluluklara sahip olacak:

```text
Client bilgilerini tutmak

Client'ın projelerini takip etmek

Client'a proje eklemek

Client'ın toplam proje değerini hesaplamak
```

Burada önemli bir soru soracağız:

> Toplam proje değerini Client mı hesaplamalı, ClientManager mı?

Bu tür kararları sana ezberletmeyeceğim; **neden birini seçtiğimizi beraber değerlendireceğiz.**

---

# AŞAMA 6 — Project Modelini Oluştur

Burası projenin en önemli modeli.

Project şu bilgileri taşıyacak:

```text
id
title
client
budget
startDate
deadline
status
tasks
```

Ama yalnızca veri taşıyan aptal bir object olmayacak.

Project kendi task listesini yönetebilecek.

Yani sorumlulukları arasında:

```text
Task ekleme

Task bulma

Task durumunu değiştirme

Toplam estimatedHours hesaplama

Tamamlanma yüzdesini hesaplama

Bütün task'lar tamamlandı mı kontrol etme
```

olacak.

Burada ilk ciddi business rule'umuzu ekleyeceğiz:

```text
Project COMPLETED yapılmak isteniyor
          ↓
Tüm Task'lar completed mı?
          ↓
     YES       NO
      ↓         ↓
 completed    hata
```

Bu proje için CV'lik kısmın başladığı yerlerden biri tam olarak burası.

Çünkü artık sadece property tutmuyoruz.

**Business rule uyguluyoruz.**

---

# AŞAMA 7 — Invoice Modelini Oluştur

Invoice:

```text
id
projectId
amount
status
```

bilgilerini taşıyacak.

Invoice'ın en önemli davranışı:

```text
markAsPaid()
```

mantığı olacak.

Burada yine encapsulation kullanacağız.

Invoice status dışarıdan kontrolsüz değiştirilmemeli.

Ayrıca:

```text
paid
unpaid
cancelled
```

durumları arasındaki geçişlerin mantıklı olup olmadığını düşüneceğiz.

---

# AŞAMA 8 — ClientManager

Şimdi model katmanından service/manager katmanına geçiyoruz.

ClientManager sistemdeki bütün müşterileri yönetecek.

Burada:

```text
private clients
```

benzeri merkezi bir koleksiyonumuz olacak.

ClientManager'ın sorumlulukları:

```text
Client ekle

ID ile Client bul

Tüm Client'ları getir

Client var mı kontrol et
```

Burada önemli mimari fark:

```text
Client
→ tek bir müşterinin davranışları

ClientManager
→ sistemdeki bütün müşterilerin yönetimi
```

Bu farkı oturtacağız.

---

# AŞAMA 9 — ProjectManager

Burası servis katmanının en önemli bölümü.

Project oluştururken önce:

```text
ClientManager
      ↓
Client var mı?
      ↓
YES        NO
 ↓          ↓
Project    hata
oluştur
```

kontrolü yapılacak.

Çünkü proje gereksinimi özellikle bunu istiyor.

ProjectManager daha sonra şu işlemleri yapacak:

```text
Project oluştur

Project bul

Project status değiştir

Task ekle

Aktif projeleri getir

Tamamlanan projeleri getir

Belirli müşterinin projelerini getir

Gecikmiş projeleri bul

En yüksek bütçeli projeyi bul
```

Burada `.filter()`, `.find()`, `.reduce()` gibi JavaScript/TypeScript dizi işlemlerini ciddi şekilde kullanmaya başlayacağız.

---

# AŞAMA 10 — InvoiceManager

InvoiceManager:

```text
Invoice oluştur

Invoice bul

Invoice'ı paid yap

Unpaid invoice'ları getir

Toplam invoiced hesapla

Toplam collected hesapla
```

işlemlerinden sorumlu olacak.

Fakat yine bir business rule olacak.

Invoice oluşturulurken:

```text
projectId
   ↓
ProjectManager
   ↓
Project var mı?
```

kontrolü yapılmalı.

Olmayan proje için fatura oluşturamayız.

Böylece ilişkimiz:

```text
ClientManager
      ↓
ProjectManager
      ↓
InvoiceManager
```

haline gelecek.

---

# AŞAMA 11 — Type Assertion Kullan

Projede type assertion sırf zorunluluk yerine getirilsin diye saçma bir yere eklenmemeli.

Gerçekçi bir senaryo oluşturacağız.

Mesela terminalden veya dışarıdan geldiğini varsaydığımız bir veri:

```text
unknown
```

olarak kabul edilecek.

Daha sonra gerekli kontrollerden sonra belirli bir TypeScript type'ına dönüştürülecek.

Burada özellikle:

```text
unknown
```

ile

```text
any
```

arasındaki farkı göreceğiz.

Çünkü projede `any` yasak.

Bu aslında TypeScript öğrenmen açısından projenin önemli bölümlerinden biri.

---

# AŞAMA 12 — Hesaplama Fonksiyonları

Burada bazı işlemleri class'ların içine gömmek yerine reusable function olarak ayıracağız.

Örneğin:

```text
Toplam proje değeri

Toplam estimated hours

Completion percentage

Toplam kazanılan para
```

gibi hesaplamaların hangisinin function, hangisinin class method olması gerektiğine karar vereceğiz.

Amaç:

> “Her şeyi class'a doldurmak” da kötü tasarımdır.

bunu göstermek.

---

# AŞAMA 13 — Gecikmiş Proje Mantığı

Deadline artık gerçekten kullanılmaya başlayacak.

Mantığımız:

```text
deadline < bugün
AND
status !== completed
AND
status !== cancelled
```

ise:

```text
OVERDUE
```

kabul edebiliriz.

Burada Date nesnesiyle çalışma pratiği de yapacağız.

---

# AŞAMA 14 — ReportGenerator

Artık elimizde yeterince veri ve manager olacak.

Şimdi:

```text
utils/ReportGenerator.ts
```

dosyasını oluşturacağız.

Bu class'ın görevi veri değiştirmek değil.

Sadece mevcut veriden rapor üretmek.

Örneğin proje özeti:

```text
========================================

Project: E-Commerce Website

Client:
ABC Teknoloji

Budget:
120.000 TL

Tasks:
✓ UI Design
✓ Authentication
✓ Product Management
✗ Payment System

Status:
ACTIVE

Completion:
75%

Estimated Work:
94 hours

Invoice:
60.000 TL / UNPAID

========================================
```

Burada separation of concerns konusunu gerçekten uygulamış olacağız.

Project veri tutacak.

ProjectManager projeleri yönetecek.

ReportGenerator sadece raporlayacak.

---

# AŞAMA 15 — Dashboard Report

Sonra genel dashboard'u oluşturacağız.

Hesaplanacak değerler:

```text
Client sayısı

Project sayısı

Active Project sayısı

Completed Project sayısı

Planned Project sayısı

Cancelled Project sayısı

Toplam Project Budget

Toplam Invoice miktarı

Toplam tahsil edilen miktar

Ödenmemiş miktar
```

Terminal çıktımız kabaca:

```text
========== FREELANCE DASHBOARD ==========

Clients: 3
Projects: 7

Active Projects: 3
Completed Projects: 2
Planned Projects: 1
Cancelled Projects: 1

Total Project Value: 485.000 TL

Total Invoiced:
320.000 TL

Total Collected:
210.000 TL

Outstanding:
110.000 TL

==========================================
```

şeklinde olacak.

---

# AŞAMA 16 — Final Test Datası

Ancak **bütün sistem bittikten sonra** büyük test datası oluşturacağız.

Direkt başta 25 Task girip kendimizi delirtmeyeceğiz. :D

Önce küçük veriyle:

```text
1 Client
1 Project
2 Task
1 Invoice
```

test edeceğiz.

Her şey doğru çalışınca final senaryoya geçeceğiz:

```text
3 Client
   ↓
7 Project
   ↓
25 Task
   ↓
8 Invoice
```

Böylece hata olduğunda 43 tane nesnenin arasında hata aramayız.

---

# AŞAMA 17 — Business Rule Testleri

Final dashboard çıkınca proje **bitmiş sayılmayacak.**

Şunları özellikle kırmaya çalışacağız:

```text
Olmayan Client'a Project ekle.

Olmayan Project'e Invoice ekle.

Task'ları tamamlanmamış Project'i completed yap.

Aynı ID ile iki Client ekle.

Aynı ID ile iki Project ekle.

Paid Invoice'ı tekrar paid yap.

Cancelled Project'i completed yapmaya çalış.

Olmayan Task'ın durumunu değiştir.

Deadline geçmiş projeyi kontrol et.
```

Senior mantığında geliştirme biraz da budur:

> Happy path çalışıyor diye sistem doğru değildir.

Yanlış kullanımda ne yaptığı da önemlidir.

---

# AŞAMA 18 — Refactor

En son kodu tekrar inceleyeceğiz.

Özellikle şunları arayacağız:

```text
Tekrarlanan kod var mı?

Gereksiz public property var mı?

Private olması gereken alan var mı?

Manager çok fazla sorumluluk almış mı?

Model çok fazla sorumluluk almış mı?

any kullanılmış mı?

Gereksiz type assertion var mı?

Dosyalar doğru modüllere ayrılmış mı?

Naming tutarlı mı?
```

Bu aşamada kodu biraz daha profesyonel seviyeye çekeceğiz.

---

# AŞAMA 19 — README ve GitHub

En son GitHub tarafına geçeceğiz.

README'de sadece:

> Freelance management application yaptım.

demeyeceğiz.

Mimariyi de göstereceğiz:

```text
Features
Project Structure
Domain Model
TypeScript Concepts Used
Business Rules
Example Output
Installation
Running the Project
```

gibi bölümler olacak.

CV açısından özellikle:

```text
TypeScript
OOP
Modular Architecture
Encapsulation
Domain Relationships
Business Rules
Service Layer
```

öne çıkarılacak.

---

## Bizim çalışma sıramız

Özetle şu sırayı kesinlikle bozmayalım:

```text
0  Project Setup
        ↓
1  Domain Design
        ↓
2  Custom Types
        ↓
3  Interfaces
        ↓
4  Task Model
        ↓
5  Client Model
        ↓
6  Project Model
        ↓
7  Invoice Model
        ↓
8  ClientManager
        ↓
9  ProjectManager
        ↓
10 InvoiceManager
        ↓
11 Type Assertion
        ↓
12 Calculations
        ↓
13 Overdue Logic
        ↓
14 ReportGenerator
        ↓
15 Dashboard
        ↓
16 Final Test Data
        ↓
17 Business Rule Tests
        ↓
18 Refactor
        ↓
19 README + GitHub
```

Ve özellikle **AŞAMA 0–3'ü hızlı geçmeyeceğiz**. Çünkü bu projenin asıl öğretici tarafı 25 tane Task yazmak değil; **neden `ProjectManager` ayrı, `Project` ayrı; neden status için `string` yerine custom type kullanıyoruz; hangi property private olmalı; hangi davranış hangi class'a ait olmalı** bunları kavraman.

İlk başlayacağımız yer **AŞAMA 0: proje klasörünü oluşturma + TypeScript kurulumu + `tsconfig` + klasör mimarisi** olacak. Orada da önce sana terminalde ne yapacağını tek tek söyleyeceğim; daha domain koduna geçmeyeceğiz.
