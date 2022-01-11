package app.moonland.app.ui.explore;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import app.moonland.app.R;
import app.moonland.app.data.models.Coin;
import app.moonland.app.data.models.UIMessage;
import app.moonland.app.ui.AwesomeListAdapter;


public class SearchFragment extends Fragment {

    private String TAG = "SearchFragment";
    private RecyclerView recyclerView;
    private RelativeLayout loadingView;
    private TextView messageTitle;
    private TextView messageDescription;
    private ConstraintLayout messageView;
    private ImageView messageImage;
    private AwesomeListAdapter resultListAdapter;
    private EditText searchField;
    private View root;
    private SearchViewModel viewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        root = inflater.inflate(R.layout.fragment_search, container, false);
        initViews();
        registerListeners();
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        viewModel = new ViewModelProvider(requireActivity()).get(SearchViewModel.class);
        searchField.setText(viewModel.getQueryValue());
        registerStateObservers();
    }

    private void initViews() {
        searchField = root.findViewById(R.id.search_field);
        recyclerView = root.findViewById(R.id.results_view);
        resultListAdapter = new AwesomeListAdapter(this.getContext());
        recyclerView.setAdapter(resultListAdapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this.getContext()));
        loadingView = root.findViewById(R.id.loading_view_container);
        messageView = root.findViewById(R.id.message_view_container);
        messageTitle = root.findViewById(R.id.message_view_title);
        messageDescription = root.findViewById(R.id.message_view_desc);
        messageImage = root.findViewById(R.id.message_view_image);
    }

    /**
     * Observes and reacts to state changes by updating views.
     */
    private void registerStateObservers() {
        viewModel.getObservableSearchItems().observe(requireActivity(), new Observer<List<Coin>>() {
            @Override
            public void onChanged(List<Coin> coins) {
                resultListAdapter.setItems(coins);
            }
        });
        viewModel.getIsLoading().observe(requireActivity(), new Observer<Boolean>() {
            @Override
            public void onChanged(Boolean aBoolean) {
                if (aBoolean) {
                    loadingView.setVisibility(View.VISIBLE);
                    messageView.setVisibility(View.GONE);
                } else {
                    loadingView.setVisibility(View.GONE);
                }
            }
        });
        viewModel.getMessage().observe(requireActivity(), new Observer<UIMessage>() {
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
    }

    /**
     * Listens to user interaction events.
     */
    private void registerListeners() {
        searchField.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) { }

            @Override
            public void afterTextChanged(Editable s) { }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                viewModel.searchQuery(s.toString());
            }
        });
        resultListAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO: refactor
                int itemPosition = recyclerView.getChildLayoutPosition(v);
//                AwesomeItem item = viewModel.getSearchItems().get(itemPosition);
//                Navigation.findNavController(v).navigate(
//                        SearchFragmentDirections.actionNavigationHomeToItemDetails(item.uid)
//                );
            }
        });
        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);
            }
        });
    }

}
