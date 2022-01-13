package app.moonland.app.data;

import java.util.List;

import app.moonland.app.data.models.AwesomeItem;
import app.moonland.app.data.models.Coin;
import app.moonland.app.data.models.SearchResponse;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface MoonlandService {

    @GET("coins")
    Call<List<Coin>> fetchCoins(@Query("l") int limit, @Query("q") String query);

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