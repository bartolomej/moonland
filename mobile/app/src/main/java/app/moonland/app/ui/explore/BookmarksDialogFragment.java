package app.moonland.app.ui.explore;

import android.app.Dialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;

import java.util.List;

import app.moonland.app.data.models.GroupWithItems;

import static androidx.constraintlayout.widget.Constraints.TAG;

public class BookmarksDialogFragment extends DialogFragment {

    private String[] names;
    private List<GroupWithItems> groups;

    // Use this instance of the interface to deliver action events
    BookmarksDialogListener listener;

    public interface BookmarksDialogListener {
        public void onDialogItemPick(GroupWithItems group);
    }

    void setOnPickListener(BookmarksDialogListener listener) {
        this.listener = listener;
    }

    public BookmarksDialogFragment() { }

    void setGroups(List<GroupWithItems> groups) {
        this.groups = groups;
        names = new String[groups.size()];
        for (int i = 0; i < groups.size(); i++) {
            GroupWithItems group = groups.get(i);
            names[i] = group.bookmarkGroup.name + " " + group.items.size();
        }
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setTitle("Choose bookmark group")
                .setItems(names, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Log.d(TAG, "clicked on item: " + which);
                        listener.onDialogItemPick(groups.get(which));
                        dialog.dismiss();
                    }
                });
        return builder.create();
    }

}
