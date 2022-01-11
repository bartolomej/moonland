package app.moonland.app.data;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.List;

import app.moonland.app.MoonlandError;
import app.moonland.app.data.models.Coin;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Repository {

    private static final String TAG = "Repository";
    private static Repository instance;
    private Call<List<Coin>> searchRequest;

    public static Repository getInstance() {
        if (instance == null) {
            instance = new Repository();
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

    public LiveData<Resource<List<Coin>>> fetchCoins() {
        MutableLiveData<Resource<List<Coin>>> result = new MutableLiveData<>();
        MoonlandService service = MoonlandService.Factory.create();
        if (searchRequest != null && !searchRequest.isCanceled()) {
            searchRequest.cancel();
        }
        searchRequest = service.fetchCoins();
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
                if (!t.getMessage().equals("Canceled")) {
                    result.postValue(Resource.failed(MoonlandError.network(t.getMessage())));
                }
            }
        });
        return result;
    }

}
