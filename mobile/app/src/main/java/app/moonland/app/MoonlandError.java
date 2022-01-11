package app.moonland.app;

enum ErrorType {
    NETWORK_ERROR,
}

public class MoonlandError extends Exception {

    private ErrorType type;

    private MoonlandError(String message, ErrorType type) {
        super(message);
        this.type = type;
    }

    public ErrorType getType() {
        return type;
    }

    public static MoonlandError network(String message) {
        return new MoonlandError(message, ErrorType.NETWORK_ERROR);
    }
}
