package app.moonland.app.ui.explore;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModel;

import java.util.ArrayList;
import java.util.List;

import app.moonland.app.R;
import app.moonland.app.data.Repository;
import app.moonland.app.data.Resource;
import app.moonland.app.data.models.Coin;
import app.moonland.app.data.models.UIMessage;

public class SearchViewModel extends ViewModel {

    private static final String TAG = "SearchViewModel";
    private MutableLiveData<String> query;
    private MutableLiveData<UIMessage> message;
    private MutableLiveData<Boolean> isLoading;
    private MutableLiveData<List<Coin>> coins;
    private int pageIndex = 0;
    private int itemsPerPage = 20;

    public SearchViewModel() {
        query = new MutableLiveData<>();
        message = new MutableLiveData<>();
        isLoading = new MutableLiveData<>();
        isLoading.setValue(false);
        coins = new MutableLiveData<>();
        coins.setValue(new ArrayList<Coin>());
    }

    LiveData<UIMessage> getMessage() {
        return message;
    }

    MutableLiveData<Boolean> getIsLoading() {
        return isLoading;
    }

    String getQueryValue() {
        return query.getValue();
    }

    LiveData<List<Coin>> getObservableSearchItems() {
        return coins;
    }

    List<Coin> getCoins() {
        if (coins.getValue() != null) {
            return coins.getValue();
        } else {
            return new ArrayList<>();
        }
    }

    void searchQuery(String query) {
        this.query.postValue(query);
        this.isLoading.setValue(true);
        LiveData<Resource<List<Coin>>> source = Repository.getInstance().fetchCoins(query);
        source.observeForever(new Observer<Resource<List<Coin>>>() {
            @Override
            public void onChanged(Resource<List<Coin>> resource) {
                if (resource.data != null && resource.data.size() == 0) {
                    message.postValue(new UIMessage(
                            R.string.no_search_items_title,
                            R.string.no_search_items_desc,
                            R.drawable.ic_ufo
                    ));
                }
                if (resource.error != null) {
                    Log.d(TAG, "ERROR WHILE FETCHING: " + resource.error.getMessage());
                    coins.postValue(null);
                    message.setValue(new UIMessage(
                            R.string.search_error_title,
                            R.string.search_error_desc,
                            R.drawable.ic_meteor
                    ));
                } else {
                    coins.postValue(resource.data);
                    message.setValue(null);
                }
                isLoading.postValue(false);
            }
        });
    }
}
