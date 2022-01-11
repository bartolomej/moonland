package app.moonland.app.data.models;

import androidx.annotation.NonNull;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class AwesomeItem {

    @NonNull
    public String uid;
    @SerializedName(value = "source")
    public String sourceRepoId;
    public String groupId;
    @SerializedName(value = "object_type")
    public String type;
    public String author;
    public String title;
    public String description;
    public String url;
    public String image;
    public int stars;
    public int forks;
    public ArrayList<String> tags;
    public ArrayList<String> urls;

    public AwesomeItem(@NonNull String uid) {
        this.uid = uid;
    }

    public boolean hasTags() {
        return this.tags.size() > 0;
    }

    public void setBookmarkGroup (String uid) {
        groupId = uid;
    }

    @NonNull
    public String toString () {
        return String.format("AwesomeItem[uid:%s, title:%s]", this.uid, this.title);
    }
}