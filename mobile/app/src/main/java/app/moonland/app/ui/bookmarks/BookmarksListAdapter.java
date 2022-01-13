package app.moonland.app.ui.bookmarks;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import app.moonland.app.R;

public class BookmarksListAdapter extends RecyclerView.Adapter {

    private final LayoutInflater layoutInflater;
    private View.OnClickListener onClickListener;

    BookmarksListAdapter(Context context) {
        layoutInflater = LayoutInflater.from(context);
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = layoutInflater.inflate(R.layout.bookmark_item, parent, false);
        view.setOnClickListener(onClickListener);
        return new BookmarkItemViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
//        GroupWithItems current = items.get(position);
//        BookmarkItemViewHolder viewHolder = (BookmarkItemViewHolder) holder;
//        viewHolder.setItemsCount(current.getItemsCount());
//        viewHolder.setName(current.bookmarkGroup.name);
    }

    @Override
    public int getItemCount() {
        return 0;
    }

//    void setItems (List<GroupWithItems> groupWithItems) {
//        if (items != null) {
//            items = groupWithItems;
//        }
//        notifyDataSetChanged();
//    }

    public void setOnClickListener(View.OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }
}

class BookmarkItemViewHolder extends RecyclerView.ViewHolder {

    final TextView name;
    final TextView itemsCount;
    final ImageView image;

    BookmarkItemViewHolder(View itemView) {
        super(itemView);
        name = itemView.findViewById(R.id.bookmark_item_name);
        itemsCount = itemView.findViewById(R.id.bookmark_item_count);
        image = itemView.findViewById(R.id.bookmark_item_image);
    }

    void setName (String name) {
        this.name.setText(name);
    }

    void setItemsCount (int itemsCount) {
        this.itemsCount.setText(String.format("%d items", itemsCount));
    }

}
