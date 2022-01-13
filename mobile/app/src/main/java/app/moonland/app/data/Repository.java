package app.moonland.app.data;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.List;
import java.util.Objects;

import app.moonland.app.MoonlandError;
import app.moonland.app.data.models.Coin;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Repository {

    private static final String TAG = "Repository";
    private static Repository instance;
    private static MoonlandService service;
    private Call<List<Coin>> searchRequest;

    public static Repository getInstance() {
        if (instance == null) {
            instance = new Repository();
            service = MoonlandService.Factory.create();
        }
        return instance;
    }

    public LiveData<Resource<Coin>> fetchCoin(String id) {
        // TODO: remove mock
        MutableLiveData<Resource<Coin>> result = new MutableLiveData<>();
        Coin coin = new Coin();
        coin.id = "1";
        coin.name = "test";
        coin.description = "description";
        result.postValue(Resource.success(coin));
        return result;
    }

    public LiveData<Resource<List<Coin>>> fetchCoins(String searchQuery) {
        MutableLiveData<Resource<List<Coin>>> result = new MutableLiveData<>();
        if (searchRequest != null && !searchRequest.isCanceled()) {
            searchRequest.cancel();
        }
        searchRequest = service.fetchCoins(50, searchQuery);
        searchRequest.enqueue(new Callback<List<Coin>>() {
            @Override
            public void onResponse(Call<List<Coin>> call, Response<List<Coin>> res) {
                if (res.code() == 200) {
                    result.postValue(Resource.success(res.body()));
                } else {
                    result.postValue(Resource.failed(MoonlandError.network(res.message())));
                }
            }

            @Override
            public void onFailure(Call<List<Coin>> call, Throwable t) {
                // do not recognise as error if request was cancelled
                // ignore socket error for now, seems to be some kind of issue with retrofit (or invalid usage of API)
                // https://github.com/square/retrofit/issues/2708
                if (Objects.requireNonNull(t.getMessage()).matches("(Canceled)|(Socket closed)")) {
                    return;
                }
                result.postValue(Resource.failed(MoonlandError.network(t.getMessage())));
            }
        });
        return result;
    }

}
