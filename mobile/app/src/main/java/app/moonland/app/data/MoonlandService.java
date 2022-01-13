package app.moonland.app.data;

import java.util.List;

import app.moonland.app.data.models.Coin;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface MoonlandService {

    // use static userId for demo
    String userId = "e04d6e9b-9dc8-41dd-b468-2a304946d309";

    @GET("coins")
    Call<List<Coin>> fetchCoins(@Query("l") int limit, @Query("q") String query);

    @GET("coins/{id}")
    Call<Coin> fetchCoin(@Path("id") String id);

    @PUT("coins/{id}")
    Call<Coin> bookmarkCoin(@Path("id") String id);

    class Factory {
        public static MoonlandService create() {
            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl("http://83.212.82.177:5001/api/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
            return retrofit.create(MoonlandService.class);
        }
    }
}