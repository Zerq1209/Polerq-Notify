# 🔔 Polerq Notify

Modern and lightweight standalone notification system for FiveM.  
Simple, fast and customizable.

FiveM için modern ve hafif standalone bildirim sistemi.  
Basit, hızlı ve özelleştirilebilir.

---

### 🎨 Fully Customizable
You can edit:

- Title
- Description
- Colors
- Duration

### 🎨 Tam Özelleştirilebilir

Değiştirilebilir:

- Başlık
- Açıklama
- Renkler
- Bildirim süresi

---

### ⚡ Lightweight
- Optimized
- Fast response
- No unnecessary load

### ⚡ Hafif ve Optimize
- Optimize edilmiş yapı
- Hızlı tepki
- Gereksiz yük oluşturmaz

---

### 🛠️ Easy Integration
Use inside any standalone script.

### 🛠️ Kolay Entegrasyon
Her standalone script içine kolayca eklenebilir.

---

## 📦 Requirements | Gereksinimler

- FiveM Server
- Standalone resource

No framework required.

Framework gerekmez.

---

## ⚙️ Installation | Kurulum

### 🇹🇷 Türkçe

1. Dosyayı indir
2. `resources` klasörüne koy

```cfg
resources/Polerq-Notify
```

3. `server.cfg` içine ekle

```cfg
ensure Polerq-Notify
```

4. Sunucuyu yeniden başlat

---

### 🇬🇧 English

1. Download resource
2. Put inside resources folder

```cfg
resources/Polerq-Notify
```

3. Add to `server.cfg`

```cfg
ensure Polerq-Notify
```

4. Restart server

---

## 💻 Example Usage | Kullanım

### 🇹🇷 Türkçe

```lua
exports["Polerq-Notify"]:Notify({
    title = "Başarılı",
    description = "Araç garajdan çıkarıldı.",
    type = "success"
})
```

---

### 🇬🇧 English

```lua
exports["Polerq-Notify"]:Notify({
    title = "Success",
    description = "Vehicle has been taken out.",
    type = "success"
})
```

---

## 🎨 Notification Types

✅ Success  
❌ Error  
⚠️ Warning  
ℹ️ Info

---

## 🖼️ Preview


<img width="422" height="374" alt="Ekran görüntüsü 2026-05-31 004906" src="https://github.com/user-attachments/assets/af36dd94-4a55-484c-8d5e-da47077faff5" />


---

## 🛠️ Support

GitHub Issues:

https://github.com/Zerq1209/Polerq-Notify/issues

---

## 📄 License

MIT License

Free to use and edit.

Please keep credits ❤️

© 2026 Zerq1209
