RegisterNetEvent("utk-notify:server:show", function(target, data)
    local src = source

    if target == nil then
        return
    end

    if type(data) ~= "table" then
        return
    end

    TriggerClientEvent("utk-notify:client:show", target, data)
end)

exports("NotifyPlayer", function(target, notificationType, title, message, duration)
    TriggerClientEvent("utk-notify:client:show", target, {
        type = notificationType or "info",
        title = title or "Bildirim",
        message = message or "",
        duration = duration or 3500
    })
end)

exports("NotifyAll", function(notificationType, title, message, duration)
    TriggerClientEvent("utk-notify:client:show", -1, {
        type = notificationType or "info",
        title = title or "Bildirim",
        message = message or "",
        duration = duration or 3500
    })
end)