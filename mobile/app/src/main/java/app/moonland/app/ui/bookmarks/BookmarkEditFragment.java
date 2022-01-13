package app.moonland.app.ui.bookmarks;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;

import app.moonland.app.R;
import studio.carbonylgroup.textfieldboxes.ExtendedEditText;


public class BookmarkEditFragment extends Fragment {

    private View root;
    private Toolbar toolbar;
    private Button saveButton;
    private ExtendedEditText nameTextField;
    private String uid;
    private BookmarksViewModal viewModal;
    private NavController navController;
    private final String TAG = "BookmarkEditFragment";

    public BookmarkEditFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        viewModal = new ViewModelProvider(this).get(BookmarksViewModal.class);
        root = inflater.inflate(R.layout.fragment_bookmark_edit, container, false);
        uid = BookmarkEditFragmentArgs.fromBundle(getArguments()).getBookmarkUid();
        setupViews();
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        setupNavigation(view);
        registerInteractionListeners();
    }

    private void setupViews() {
        nameTextField = root.findViewById(R.id.edit_name_text_field);
        saveButton = root.findViewById(R.id.edit_bookmark_save_btn);
        toolbar = root.findViewById(R.id.bookmark_edit_toolbar);
        toolbar.setTitle("");
    }

    private void setupNavigation(View view) {
        navController = Navigation.findNavController(view);
        AppBarConfiguration appBarConfiguration =
                new AppBarConfiguration.Builder(navController.getGraph()).build();
        // hide if creating new group
        if (uid == null) {
            toolbar.findViewById(R.id.edit_bookmark_delete_btn).setVisibility(View.GONE);
        }
        NavigationUI.setupWithNavController(toolbar, navController, appBarConfiguration);
    }

    private void registerInteractionListeners() {
        if (uid != null) {
            toolbar.findViewById(R.id.edit_bookmark_delete_btn).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    navController.popBackStack();
                }
            });
        }
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                navController.popBackStack();
                InputMethodManager imm = (InputMethodManager)getActivity().getSystemService(Context.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(getActivity().getCurrentFocus().getWindowToken(), 0);
            }
        });
    }
}
