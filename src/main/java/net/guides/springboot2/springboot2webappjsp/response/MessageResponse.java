package net.guides.springboot2.springboot2webappjsp.response;

public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message=message;
    }

    public String getMessageResponse() {
        return this.message;
    }

    public void setMessageResponse(String message) {
        this.message=message;
    }
}
