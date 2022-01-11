package app.moonland.app.ui.bookmarks;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.Toolbar;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import app.moonland.app.R;
import app.moonland.app.data.models.GroupWithItems;
import app.moonland.app.data.models.UIMessage;

public class BookmarksFragment extends Fragment {

    private String TAG = "BookmarksFragment";
    private View root;
    private Toolbar toolbar;

    private BookmarksViewModal viewModel;
    private RecyclerView bookmarksRecyclerView;
    private TextView messageTitle;
    private TextView messageDescription;
    private ConstraintLayout messageView;
    private BookmarksListAdapter bookmarksListAdapter;
    private List<GroupWithItems> groupWithItems;
    private ImageView messageImage;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        viewModel = new ViewModelProvider(this).get(BookmarksViewModal.class);
        root = inflater.inflate(R.layout.fragment_bookmarks, container, false);
        initViews();
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        registerStateObservers();
        registerInteractionListeners();
    }

    private void initViews() {
        toolbar = root.findViewById(R.id.bookmarks_toolbar);
        bookmarksRecyclerView = root.findViewById(R.id.bookmarks_recycler_view);
        bookmarksListAdapter = new BookmarksListAdapter(this.getContext());
        bookmarksRecyclerView.setLayoutManager(new LinearLayoutManager(this.getContext()));
        bookmarksRecyclerView.setAdapter(bookmarksListAdapter);
        messageView = root.findViewById(R.id.message_view_container);
        messageTitle = root.findViewById(R.id.message_view_title);
        messageDescription = root.findViewById(R.id.message_view_desc);
        messageImage = root.findViewById(R.id.message_view_image);
        toolbar.setTitle(null);
        toolbar.setNavigationIcon(null);
    }

    private void registerStateObservers() {
        viewModel.getMessage().observe(this.getViewLifecycleOwner(), new Observer<UIMessage>() {
            @Override
            public void onChanged(UIMessage m) {
                if (m != null) {
                    messageView.setVisibility(View.VISIBLE);
                    messageTitle.setText(m.title);
                    messageDescription.setText(m.description);
                    if (m.imageResource != 0) {
                        messageImage.setImageResource(m.imageResource);
                    }
                } else {
                    messageView.setVisibility(View.GONE);
                }
            }
        });
        bookmarksListAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO; refactor
                int itemPosition = bookmarksRecyclerView.getChildLayoutPosition(v);
                GroupWithItems item = groupWithItems.get(itemPosition);
                Navigation.findNavController(v).navigate(
                        BookmarksFragmentDirections.actionNavigationBookmarksToBookmarkDetailsFragment(item.bookmarkGroup.name)
                );
            }
        });
    }

    private void registerInteractionListeners () {
        toolbar.findViewById(R.id.add_bookmark_group_btn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Navigation.findNavController(root).navigate(
                        BookmarksFragmentDirections.actionNavigationBookmarksToBookmarkEditFragment(null)
                );
            }
        });
    }
}
