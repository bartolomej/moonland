package app.moonland.app.data;

import app.moonland.app.MoonlandError;

public class Resource<T> {

    public final T data;
    public final MoonlandError error;

    private Resource (T data, MoonlandError error) {
        this.data = data;
        this.error = error;
    }

    public static <T> Resource<T> success (T data) {
        return new Resource<T>(data, null);
    }

    public static <T> Resource<T> failed (MoonlandError error) {
        return new Resource<T>(null, error);
    }
}
