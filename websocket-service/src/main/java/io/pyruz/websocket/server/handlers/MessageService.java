package io.pyruz.websocket.server.handlers;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.UUID;

@Service
public class MessageService {
    final SimpMessagingTemplate template;

    public MessageService(SimpMessagingTemplate template) {
        this.template = template;
    }

    @Scheduled(fixedRate = 2000)
    public void pushMessageToClient() {
        // pushing the data to websocket
        var message = UUID.randomUUID().toString();
        System.out.println(message + "  -  " + new Date());
        this.template.convertAndSend("/topic/messages", message);
    }
}
