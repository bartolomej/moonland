package app.moonland.app.data.models;

import java.util.List;

public class GroupWithItems {
    public BookmarkGroup bookmarkGroup;

    public List<AwesomeItem> items;

    public int getItemsCount () {
        if (items != null) {
            return items.size();
        } else {
            return 0;
        }
    }

    public boolean hasItems () {
        return this.items != null && this.items.size() > 0;
    }
}
