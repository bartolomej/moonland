package app.moonland.app.ui.explore;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.squareup.picasso.Picasso;

import app.moonland.app.MoonlandError;
import app.moonland.app.R;
import app.moonland.app.data.models.Coin;


public class DetailsFragment extends Fragment {

    private static final String TAG = "DetailsFragment";
    private DetailsViewModel viewModel;
    private Coin coin;
    private String uid;
    private String url;
    private View root;
    private TextView titleView;
    private TextView descriptionView;
    private ImageView imageView;
    private Button urlButton;
    private Toolbar toolbar;


    public DetailsFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        root = inflater.inflate(R.layout.fragment_details, container, false);
        initViews();
        registerInteractionListeners();
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        uid = DetailsFragmentArgs.fromBundle(getArguments()).getItemUid();
        viewModel = new ViewModelProvider(this).get(DetailsViewModel.class);
        setupNavigation(view);
        registerStateObservers();
    }

    private void setupNavigation(View view) {
        NavController navController = Navigation.findNavController(view);
        AppBarConfiguration appBarConfiguration =
                new AppBarConfiguration.Builder(navController.getGraph()).build();
        NavigationUI.setupWithNavController(toolbar, navController, appBarConfiguration);
    }

    private void initViews() {
        titleView = root.findViewById(R.id.details_title);
        descriptionView = root.findViewById(R.id.details_description);
        imageView = root.findViewById(R.id.details_image);
        urlButton = root.findViewById(R.id.details_url_btn);
        toolbar = root.findViewById(R.id.details_top_menu);
    }

    private void showBookmarkDialog() {
        // TODO: implement
    }

    private void registerStateObservers() {
        viewModel.getCoin(uid).observe(getViewLifecycleOwner(), new Observer<Coin>() {
            @Override
            public void onChanged(Coin item) {
                Log.d(TAG, item.toString());
                coin = item;
                titleView.setText(item.name);
                descriptionView.setText(item.description);
                Picasso.get().load(item.logo).into(imageView);
                url = item.websiteUrl;
            }
        });
        viewModel.getMoonlandError().observe(getViewLifecycleOwner(), new Observer<MoonlandError>() {
            @Override
            public void onChanged(MoonlandError moonlandError) {
                // TODO: handle error appropriately
                Log.d(TAG, "DETAILS FRAGMENT FETCH ERROR: " + moonlandError.getMessage());
            }
        });
    }

    private void registerInteractionListeners() {
        urlButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openPageInBrowser(url);
            }
        });
        toolbar.findViewById(R.id.add_to_bookmarks_btn).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showBookmarkDialog();
            }
        });
    }

    private void openPageInBrowser(String url) {
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        startActivity(browserIntent);
    }

}
