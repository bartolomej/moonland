package app.moonland.app.data;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

import app.moonland.app.LiveDataCallback;
import app.moonland.app.MoonlandError;
import app.moonland.app.data.models.Coin;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Repository {

    private static final String TAG = "Repository";
    private static Repository instance;
    private static MoonlandService service;
    private Call<List<Coin>> indexRequest;
    private Call<Coin> detailsRequest;

    public static Repository getInstance() {
        if (instance == null) {
            instance = new Repository();
            service = MoonlandService.Factory.create();
        }
        return instance;
    }

    public LiveData<Resource<Coin>> fetchCoin(String id) {
        MutableLiveData<Resource<Coin>> result = new MutableLiveData<>();
        if (detailsRequest != null && !detailsRequest.isCanceled()) {
            detailsRequest.cancel();
        }
        detailsRequest = service.fetchCoin(id);
        detailsRequest.timeout().timeout(5, TimeUnit.SECONDS);
        detailsRequest.enqueue(new LiveDataCallback<Coin>(result));
        return result;
    }

    public LiveData<Resource<List<Coin>>> fetchCoins(String searchQuery) {
        MutableLiveData<Resource<List<Coin>>> result = new MutableLiveData<>();
        if (indexRequest != null && !indexRequest.isCanceled()) {
            indexRequest.cancel();
        }
        indexRequest = service.fetchCoins(50, searchQuery);
        indexRequest.timeout().timeout(5, TimeUnit.SECONDS);
        indexRequest.enqueue(new LiveDataCallback<List<Coin>>(result));
        return result;
    }

}