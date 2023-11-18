package io.pyruz.websocket.server.handlers;

import io.pyruz.websocket.server.model.GameBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class GameController {

    @PostMapping("/v1/game")
    public ResponseEntity<GameBean> startNewGame(@RequestBody GameBean gameBean){
        return ResponseEntity.ok(gameBean);
    }

    @PostMapping("/v1/game/exit")
    public ResponseEntity<String> finishNewGame(){
        return ResponseEntity.ok("FINISHED");
    }
}
