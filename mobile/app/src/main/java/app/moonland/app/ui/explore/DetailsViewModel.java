package app.moonland.app.ui.explore;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModel;

import app.moonland.app.MoonlandError;
import app.moonland.app.data.Repository;
import app.moonland.app.data.Resource;
import app.moonland.app.data.models.Coin;

public class DetailsViewModel extends ViewModel {

    private MutableLiveData<Coin> itemMutableLiveData;
    private MutableLiveData<MoonlandError> errorMutableLiveData;

    public DetailsViewModel () {
        itemMutableLiveData = new MutableLiveData<>();
        errorMutableLiveData = new MutableLiveData<>();
    }

    LiveData<Coin> getCoin(String uid) {
        Repository.getInstance().fetchCoin(uid).observeForever(new Observer<Resource<Coin>>() {
            @Override
            public void onChanged(Resource<Coin> coinResource) {
                if (coinResource.error == null) {
                    itemMutableLiveData.postValue(coinResource.data);
                } else {
                    errorMutableLiveData.postValue(coinResource.error);
                }
            }
        });
        return itemMutableLiveData;
    }

    void addToBookmarks (String uid, Coin item) {
        // TODO: do something with it
    }

    LiveData<MoonlandError> getMoonlandError() {
        return errorMutableLiveData;
    }


}
