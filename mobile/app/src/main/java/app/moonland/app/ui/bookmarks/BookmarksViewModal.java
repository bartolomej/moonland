package app.moonland.app.ui.bookmarks;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;
import app.moonland.app.data.models.UIMessage;

public class BookmarksViewModal extends ViewModel {

    private MutableLiveData<UIMessage> message;

    public BookmarksViewModal() {
        message = new MutableLiveData<>();
    }

    LiveData<UIMessage> getMessage() {
        return message;
    }

}