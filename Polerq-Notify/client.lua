local function SendNotification(data)
    if type(data) ~= "table" then return end

    data.type = data.type or "info"
    data.title = data.title or "Bildirim"
    data.message = data.message or ""
    data.duration = data.duration or 3500

    SendNUIMessage({
        action = "showNotification",
        notification = data
    })
end

RegisterNetEvent("utk-notify:client:show", function(data)
    SendNotification(data)
end)

exports("Notify", function(notificationType, title, message, duration)
    SendNotification({
        type = notificationType,
        title = title,
        message = message,
        duration = duration
    })
end)

-- Test komutu
RegisterCommand("notifytest", function()
    SendNotification({
        type = "success",
        title = "Başarılı",
        message = "Bildirim sistemi çalışıyor.",
        duration = 4000
    })
        SendNotification({
        type = "warning",
        title = "Başarılı",
        message = "Bildirim sistemi çalışıyor.",
        duration = 4000
    })
        SendNotification({
        type = "error",
        title = "Başarılı",
        message = "Bildirim sistemi çalışıyor.",
        duration = 4000
    })
end, false)