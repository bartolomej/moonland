package app.moonland.app;

import androidx.lifecycle.MutableLiveData;

import java.util.Objects;

import app.moonland.app.data.Resource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Helper class that handles Retrofit response.
 */
public class LiveDataCallback<T> implements Callback<T> {

    private final MutableLiveData<Resource<T>> result;

    public  LiveDataCallback(MutableLiveData<Resource<T>> result) {
        this.result = result;
    }

    @Override
    public void onResponse(Call<T> call, Response<T> res) {
        if (res.code() == 200) {
            result.postValue(Resource.success(res.body()));
        } else {
            result.postValue(Resource.failed(MoonlandError.network(res.message())));
        }
    }

    @Override
    public void onFailure(Call<T> call, Throwable t) {
        // do not recognise as error if request was cancelled
        // ignore socket error for now, seems to be some kind of issue with retrofit (or invalid usage of API)
        // https://github.com/square/retrofit/issues/2708
        if (Objects.requireNonNull(t.getMessage()).matches("(Canceled)|(Socket closed)")) {
            return;
        }
        result.postValue(Resource.failed(MoonlandError.network(t.getMessage())));
    }
}