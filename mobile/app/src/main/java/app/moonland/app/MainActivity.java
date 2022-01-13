package app.moonland.app;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.Window;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.google.android.material.bottomnavigation.BottomNavigationView;

/**
 * EXAMPLE APPS:
 * - https://github.com/android/architecture-components-samples/tree/master/BasicSample
 * - https://github.com/ivacf/archi
 * - https://github.com/k0shk0sh/FastHub
 * - https://github.com/android/architecture-components-samples/tree/6248bed977e7a82d6f3199e8a940a39b7d6f051c/GithubBrowserSample/app/src/main/java/com/android/example/github
 * SPLASH SCREEN / ON BOARDING:
 * - https://www.youtube.com/watch?v=JLIFqqnSNmg
 * - https://www.youtube.com/watch?v=pwcG6npiXyo
 */

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";
    private AppBarConfiguration appBarConfiguration;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // https://android.jlelse.eu/launch-screen-in-android-the-right-way-aca7e8c31f52
        setTheme(R.style.AppTheme);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setupNavigation();
        setupStatusBar();
    }

    @Override
    public boolean onSupportNavigateUp() {
        // Support back navigation with action bar back button.
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        return NavigationUI.navigateUp(navController, appBarConfiguration) || super.onSupportNavigateUp();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // R.menu.mymenu is a reference to an xml file named mymenu.xml which should be inside your res/menu directory.
        // If you don't have res/menu, just create a directory named "menu" inside res
        getMenuInflater().inflate(R.menu.bookmarks_top, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.add_bookmark_group_btn) {
            Log.d(TAG, "Add bookmark group btn");
        }
        return super.onOptionsItemSelected(item);
    }

    private void setupNavigation () {
        BottomNavigationView navView = findViewById(R.id.nav_view);

        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_home, R.id.navigation_bookmarks)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        //NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        // setup bottom bar to work with navigation
        NavigationUI.setupWithNavController(navView, navController);
    }

    private void setupStatusBar () {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = this.getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(ContextCompat.getColor(this, R.color.colorBackground));
        }
    }

}
