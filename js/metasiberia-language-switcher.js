(function() {
  var STORAGE_KEY = "metasiberia.site.language";
  var DEFAULT_LANGUAGE = "ru";
  var STYLE_ID = "metasiberia-language-switcher-styles";
  var SWITCHER_CLASS = "t450__lang-switcher";

  var originalHtml = new WeakMap();

  var MENU_LABELS = {
    "1": { ru: "Главная", en: "Main" },
    "2": { ru: "Участки", en: "Parcels" },
    "3": { ru: "Магазин", en: "Store" },
    "4": { ru: "Админ-панель", en: "Admin panel" },
    "5": { ru: "Карта", en: "Map" },
    "6": { ru: "Скриптинг", en: "Scripting" },
    "7": { ru: "Вопросы", en: "F.A.Q." },
    "8": { ru: "Условия", en: "Terms of Use" },
    "9": { ru: "Чат-бот", en: "Chat-bot" },
    "10": { ru: "NFT", en: "NFT" }
  };

  var PAGE_TITLES = {
    "62281087": { ru: "Метасибирь", en: "Metasiberia" },
    "62442585": { ru: "Вопросы", en: "FAQ" },
    "63809043": { ru: "Условия", en: "Terms of Use" },
    "63810393": { ru: "Скриптинг", en: "Scripting" },
    "63811825": { ru: "Примеры скриптов", en: "Script examples" },
    "63813121": { ru: "Магазин", en: "Store" },
    "64026745": { ru: "Хедер", en: "Header" },
    "64026811": { ru: "Футер", en: "Footer" },
    "64027043": { ru: "Ошибка 404", en: "Error 404" },
    "64103135": { ru: "Морфер", en: "Morpher" }
  };

  var SELECTOR_UPDATES = [
    {
      selector: 'a[href="#t-main-content"]',
      type: "text",
      values: {
        ru: "К основному контенту",
        en: "Skip to main content"
      }
    },
    {
      selector: "#rec872145463 .t300__content-text",
      type: "text",
      values: {
        ru: "Для вашего удобства вебклиент пока работает только с компьютеров",
        en: "For your convenience, the web client currently works on desktop devices only."
      }
    },
    {
      selector: "#rec872697073 .t134__descr",
      type: "html",
      values: {
        ru: '<div style="color: rgb(0, 0, 0); text-align: center;"><strong>Denis Shipilov</strong><br /><span>© 2023–2026 Метасибирь.</span><br /><span>Сделано на Glare-core, кофе и вере в метавселенную</span></div>',
        en: '<div style="color: rgb(0, 0, 0); text-align: center;"><strong>Denis Shipilov</strong><br /><span>© 2023–2026 Metasiberia.</span><br /><span>Built with Glare-core, coffee, and faith in the metaverse</span></div>'
      }
    },
    {
      selector: "#rec859988145 .t801__button",
      type: "html",
      values: {
        ru: '<span class="t-btntext__text">Открыть в браузере</span> <style>#rec859988145 .t-btntext.t-btntext_type_button {color:#222222;border-style:none !important;box-shadow:none !important;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform;transition-timing-function:ease-in-out;}</style>',
        en: '<span class="t-btntext__text">Open in browser</span> <style>#rec859988145 .t-btntext.t-btntext_type_button {color:#222222;border-style:none !important;box-shadow:none !important;transition-duration:0.2s;transition-property:background-color,color,border-color,box-shadow,opacity,transform;transition-timing-function:ease-in-out;}</style>'
      }
    },
    {
      selector: "#rec871768544 .t001__title, #recorddiv871768544 .t001__title",
      type: "html",
      values: {
        ru: '<span style="color: rgb(0, 0, 0);">скоро</span>',
        en: '<span style="color: rgb(0, 0, 0);">coming soon</span>'
      }
    },
    {
      selector: "#rec872704795 .t001__title, #recorddiv872704795 .t001__title",
      type: "html",
      values: {
        ru: '<span style="color: rgb(255, 255, 255);">Ой, ошибка 404</span>',
        en: '<span style="color: rgb(255, 255, 255);">Oops, error 404</span>'
      }
    }
  ];
  var PAGE_HTML_TRANSLATIONS = {
    "62281087": [
      {
        selector: "#rec922094125 .t675__descr",
        html: [
          '<span>METASIBERIA&deg; is a virtual world project built with the Glare-core engine. Metasiberia is fully open source, and you can browse the source code on </span><strong><a href="https://github.com/shipilovden/sub-metasiberia" target="_blank" rel="noreferrer noopener">GitHub</a></strong><span>.</span>',
          "Study, work, play, and connect with other users. Ride motorcycles, build your own world, or buy a parcel and create your presence in the main world."
        ]
      },
      {
        selector: "#rec859988145 .t-text.t-text_md",
        html: [
          "To create an object in the main world, you need to be either on a parcel you own or in the sandbox (Parcel #31). As an alternative, you can create objects in your personal world, where there are no restrictions.",
          'A parcel is your own digital plot in virtual space. You can script it, modify it, and use it however you like, as well as grant permissions to other users for collaborative creation. Metasiberia has a huge number of parcels, and they will appear in our <strong>store</strong> soon. Follow the <strong><a href="#news">news</a></strong> so you can claim your own piece of the digital world and build something unique.'
        ]
      }
    ],
    "62442585": [
      {
        selector: "#rec859828747 .t167__text",
        html: [
          '<strong style="font-size: 28px;">Frequently Asked Questions about Metasiberia</strong><br /><br />' +
            "<strong>What is Metasiberia?</strong><br />" +
            "Metasiberia is a metaverse. Here, users can explore vast spaces, communicate, play, and create their own unique territories inside a shared virtual world.<br /><br />" +
            "<strong>How do I enter Metasiberia?</strong><br /><br />" +
            '~Client address: <a href="denied:sub://vr.metasiberia.com" style="color: rgb(0, 10, 255);">sub://vr.metasiberia.com</a><br />' +
            '~Web mode: <a href="https://vr.metasiberia.com/webclient" target="_blank" rel="noreferrer noopener" style="color: rgb(0, 10, 255);">https://vr.metasiberia.com/webclient</a><br /><br />' +
            "<ol>" +
            '<li data-list="ordered">Sign up: <a href="https://vr.metasiberia.com/signup" target="_blank" rel="noreferrer noopener" style="color: rgb(0, 10, 255);">https://vr.metasiberia.com/signup</a></li>' +
            '<li data-list="ordered">Download and install the Substrata virtual worlds client: <strong style="color: rgb(0, 10, 255);"><a href="https://disk.yandex.ru/d/-5Zv226SSBvBsg" style="color: rgb(0, 10, 255);">here</a></strong>.</li>' +
            '<li data-list="ordered">Enter <a href="denied:sub://vr.metasiberia.com" target="_blank" rel="noreferrer noopener" style="color: rgb(0, 10, 255);">sub://vr.metasiberia.com</a> in the address bar and press Enter.</li>' +
            '<li data-list="ordered">In the client, click <strong>Log in</strong> in the top-right corner and enter your username and password.</li>' +
            '<li data-list="ordered">Set Metasiberia as your start location. In the <strong>Go</strong> menu, choose <strong>Set current location as start location</strong>.</li>' +
            '<li data-list="ordered">Your avatar will now always appear in the center of Metasiberia.</li>' +
            "</ol>" +
            "<strong>What is Metasiberia based on?</strong><br />" +
            'Metasiberia is a project built on the technology of <strong style="color: rgb(0, 10, 255);"><a href="https://substrata.info/" target="_blank" rel="noreferrer noopener" style="color: rgb(0, 10, 255);">Substrata</a></strong>, developed by Glare Technologies Limited. The same team is also known for Indigo Renderer and Chaotica Fractals.<br /><br />' +
            "<strong>Why is Metasiberia considered a metaverse?</strong><br />" +
            "Metasiberia is classified as a metaverse because it is an integrated digital environment that unites multiple virtual spaces with a high degree of interactivity and user autonomy. From a scientific perspective, a metaverse is a persistent, collectively inhabited virtual reality that functions as a parallel system supporting social, creative, and economic interactions. In Metasiberia, this is achieved through the central world, which serves as a hub for new users, and through personal territories available at <strong>sub://vr.metasiberia.com/username</strong>, where everyone can shape their own space.<br /><br />" +
            "<strong>How can I buy a parcel in Metasiberia?</strong><br />" +
            "At the moment, parcel purchases are available only on request. Soon we will launch a store where parcels can be bought directly. Follow updates on our website and social channels.<br /><br />" +
            "<strong>Can I share parcel permissions in Metasiberia?</strong><br />" +
            "Yes. You can add other users as co-authors of your parcel. They will be able to create, edit, and delete objects on your land.<br />" +
            "<ol>" +
            '<li data-list="ordered">Log in to your account on the Metasiberia website and open the admin panel.</li>' +
            '<li data-list="ordered">Open your parcel from your user page.</li>' +
            '<li data-list="ordered">Click <strong>Add writer</strong> and enter the Metasiberia username.</li>' +
            "</ol>" +
            'You can also temporarily or permanently open the parcel for public editing by selecting <strong>All writeable</strong> in the object editor.<br /><br />' +
            "<strong>Creating and building in Metasiberia</strong><br />" +
            "<strong>How do I create objects in Metasiberia?</strong><br />" +
            "In the central world, you can create objects either on a parcel you own or in the sandbox (Parcel #31). In your personal world, there are no such restrictions.<br />" +
            "There are two ways to create objects:<br />" +
            "<ul>" +
            '<li data-list="bullet">In the client, choose <strong>Add model / image / video</strong> and follow the instructions.</li>' +
            '<li data-list="bullet">Create an object from voxels directly inside Metasiberia by choosing <strong>Add voxels</strong>.</li>' +
            "</ul>" +
            "Supported formats:<br />" +
            "Models: OBJ, GLTF, GLB, VOX, STL, IGMESH<br />" +
            "Images: JPG, PNG, GIF, TIF, EXR, KTX, KTX2<br />" +
            "Video: MP4<br />" +
            "Please avoid uploading very high-poly models or large files so performance stays comfortable for everyone.<br /><br />" +
            "<strong>How do voxels work in Metasiberia?</strong><br />" +
            'You can either upload a ready-made voxel file in a supported format or build it directly inside Metasiberia. To create voxels yourself, go to a parcel where you have editing rights and choose <strong>Add voxels</strong>. The first block appears as a gray cube, and a hint window explains the controls. The core interaction is simple: <strong>Ctrl + left click</strong> adds a new voxel to the selected face. While holding Ctrl, you will see exactly where the next block will appear. Voxels can be scaled in the editor with the <strong>Scale</strong> parameter.<br /><br />' +
            "<strong>How do I animate objects in Metasiberia?</strong><br />" +
            "Animation and interactivity in Metasiberia are built with the Lua-based scripting system. More details are available on the scripting pages. To assign a script, select your object in the client, open the editor, and enter the code in the <strong>Script</strong> section. Only your own objects can be edited this way.<br /><br />" +
            "<strong>Are there any content restrictions in Metasiberia?</strong><br />" +
            "Yes. Content that is not suitable for everyone, including explicit sexual or violent material, is prohibited. See the terms of use for details.<br /><br />" +
            "<strong>Troubleshooting</strong><br />" +
            "<strong>I am having trouble with Metasiberia. Where can I get help?</strong><br />" +
            "The fastest way is to contact us through our VK community or Telegram.<br /><br />" +
            "<strong>Metasiberia is built on Substrata.</strong>"
        ]
      }
    ],
    "63809043": [
      {
        selector: "#rec870753101 .t167__text",
        html: [
          '<strong style="font-size: 26px;">Metasiberia</strong><br /><br />' +
            "<strong>Terms of Service.</strong><br />" +
            'These terms of service apply to the Metasiberia website at metasiberia.com and to the Metasiberia virtual world hosted on Reg.ru servers and accessed through the <span style="color: rgb(0, 0, 0);">Substrata</span> client software.<br />' +
            'Together they form the “Service”.<br /><br />' +
            "<strong>General terms.</strong><br />" +
            'By accessing or using the “Service”, you agree to follow these Terms.<br />' +
            "If you do not agree with any part of the terms, you may not access the Service.<br />" +
            "Pornographic or violent content is not allowed.<br />" +
            "Package content must not seriously or negatively affect the performance or functioning of the Metasiberia server(s) or the Substrata client. For example, do not upload models with excessive polygon counts or overly large textures.<br />" +
            "Do not intentionally attempt to disrupt or degrade the server or other users’ clients.<br />" +
            "We reserve the right to refuse service to anyone at any time for any reason.<br />" +
            "We reserve the right to change these terms of service.<br /><br />"
        ]
      }
    ],
    "63810393": [
      {
        selector: "#rec870763264 .t167__text",
        html: [
          '<strong style="font-size: 28px;">Luau scripting in Metasiberia</strong><br /><br />' +
            "In Metasiberia, you can bring your objects to life with Luau, a modern Lua dialect inspired by Roblox. It is a powerful tool for building interactive elements and automating behavior in your virtual world.<br /><br />" +
            "<strong>Creating a script for an object.</strong><br />" +
            "You need the Substrata client to work with scripts.<br />" +
            "<ol>" +
            '<li data-list="ordered">Open the client and double-click the object you want to configure.</li>' +
            '<li data-list="ordered">In the <strong>Script</strong> section, click <strong>Edit</strong>. The editor window will appear.</li>' +
            '<li data-list="ordered">Start your code with <strong>--lua</strong> to indicate that you are using Luau instead of Winter or XML.</li>' +
            '<li data-list="ordered">After making changes, close the editor. The script will immediately be applied to the object.</li>' +
            "</ol>" +
            "<strong>How scripts work.</strong><br />" +
            "Scripts in Metasiberia run simultaneously on the client and on the metasiberia.world server. This means your code is activated on every connected device and on the central server.<br />" +
            "<ul>" +
            '<li data-list="bullet">Physical effects such as collisions are processed on the client side, where the physics simulation is calculated.</li>' +
            '<li data-list="bullet">All other changes happen on the server and are synchronized with other users instantly.</li>' +
            "</ul>" +
            "<strong>Debugging scripts.</strong><br />" +
            "Use the <strong>print</strong> function to output messages:<br />" +
            "--lua<br />" +
            'print("Hello from Metasiberia!")<br />' +
            'All debug data, including output and errors, is visible in the log window (<strong>tools &gt; Show log</strong>). If your script contains an error, it will be shown in the log and execution will stop.<br />' +
            'Server-side logs are available at <strong>metasiberia.com/script_log</strong> for logged-in users. There you can see up to 1000 recent messages and errors produced by your scripts.<br /><br />' +
            "<strong>Event listeners.</strong><br />" +
            "Scripts can react to user actions through special callback functions. Define them to track object-related events:<br />" +
            "<ul>" +
            '<li data-list="bullet">onUserTouchedObject(avatar, object) — the avatar touched the object. It fires every 0.5 seconds while contact continues.</li>' +
            '<li data-list="bullet">onUserUsedObject(avatar, object) — the user activated the object with the <strong>E</strong> key.</li>' +
            '<li data-list="bullet">onUserMovedNearToObject(avatar, object) — the avatar moved within a 20-meter radius of the object.</li>' +
            '<li data-list="bullet">onUserMovedAwayFromObject(avatar, object) — the avatar moved farther than 20 meters away.</li>' +
            '<li data-list="bullet">onUserEnteredParcel(avatar, object, parcel) — the avatar entered a parcel.</li>' +
            '<li data-list="bullet">onUserExitedParcel(avatar, object, parcel) — the avatar left a parcel.</li>' +
            '<li data-list="bullet">onUserEnteredVehicle(avatar, vehicle_ob) — the avatar entered a vehicle.</li>' +
            '<li data-list="bullet">onUserExitedVehicle(avatar, vehicle_ob) — the avatar left a vehicle.</li>' +
            "</ul>" +
            'To listen for events on other objects, use <strong>addEventListener</strong>:<br />' +
            '--lua<br />' +
            'addEventListener("onUserTouchedObject", 583, onUserTouchedObject)<br /><br />' +
            "<strong>Global functions.</strong><br />" +
            "<ul>" +
            '<li data-list="bullet">getObjectForUID(uid) — returns an object by its ID.</li>' +
            '<li data-list="bullet">showMessageToUser(msg, avatar) — displays a message to the selected user on screen.</li>' +
            '<li data-list="bullet">createTimer(onTimerEvent, interval, repeating) — creates a timer. Maximum: 4 timers.</li>' +
            '<li data-list="bullet">onTimerEvent(object) — function invoked when the timer fires.</li>' +
            '<li data-list="bullet">Returns a handle that can later be used by destroyTimer.</li>' +
            '<li data-list="bullet">destroyTimer(timer_handle) — removes a timer.</li>' +
            '<li data-list="bullet">doHTTPGetRequestAsync(url, headers, onDone, onError) — asynchronous HTTP GET request. Limit: 5 requests per 300 seconds.</li>' +
            '<li data-list="bullet">onDone({response_code, response_message, mime_type, body_data}) — success callback.</li>' +
            '<li data-list="bullet">onError({error_code, error_description}) — error callback. 0 = OK, 1 = other, 2 = rate limit.</li>' +
            '<li data-list="bullet">doHTTPPostRequestAsync(url, post_content, content_type, headers, onDone, onError) — asynchronous HTTP POST request.</li>' +
            '<li data-list="bullet">Example:</li>' +
            '<li data-list="bullet">--lua</li>' +
            `<li data-list="bullet">doHTTPPostRequestAsync( "https://example.com/api", "{ id: '123' }", "application/json", { Authorization = "Basic key" }, function(result) print(result.response_code) end, function(err) print(err.error_description) end)</li>` +
            '<li data-list="bullet">getSecret(secret_name) — retrieves a secret such as an API key from your account settings.</li>' +
            '<li data-list="bullet">my_key = getSecret("MY_API_KEY")</li>' +
            '<li data-list="bullet">parseJSON(json) — converts JSON into a Lua object.</li>' +
            `<li data-list="bullet">parseJSON('[1, true, "text", null]') → {1, true, "text", nil}</li>` +
            '<li data-list="bullet">objectstorage.setItem(key, value) — stores persistent data that survives reloads.</li>' +
            '<li data-list="bullet">objectstorage.getItem(key) — reads stored data, or nil if there is no value.</li>' +
            "</ul><br />" +
            "<strong>Visit counter example.</strong><br />" +
            "--lua<br />" +
            'local visits = objectstorage.getItem("visits") or 0<br />' +
            "visits = visits + 1<br />" +
            'objectstorage.setItem("visits", visits)<br /><br />' +
            "<strong>Global variables.</strong><br />" +
            "<ul>" +
            '<li data-list="bullet">this_object — the current object that owns the script.</li>' +
            '<li data-list="bullet">IS_CLIENT — true on the client, false on the server.</li>' +
            '<li data-list="bullet">IS_SERVER — true on the server, false on the client.</li>' +
            "</ul>" +
            "<strong>Classes.</strong><br />" +
            "<ul>" +
            '<li data-list="bullet"><strong>Object</strong></li>' +
            '<li data-list="bullet">Attributes:</li>' +
            '<li data-list="bullet">model_url — model URL (string).</li>' +
            '<li data-list="bullet">pos — position (Vec3d).</li>' +
            '<li data-list="bullet">axis — rotation axis (Vec3f).</li>' +
            '<li data-list="bullet">angle — rotation angle in radians (number).</li>' +
            '<li data-list="bullet">scale — scale (Vec3f).</li>' +
            '<li data-list="bullet">collidable — collisions enabled (true/false).</li>' +
            '<li data-list="bullet">dynamic — physics-enabled object (true/false).</li>' +
            '<li data-list="bullet">sensor — sensor mode (true/false).</li>' +
            '<li data-list="bullet">content — text content for text objects (string).</li>' +
            '<li data-list="bullet">video_autoplay — autoplay video (true/false).</li>' +
            '<li data-list="bullet">video_loop — loop video (true/false).</li>' +
            '<li data-list="bullet">video_muted — mute video (true/false).</li>' +
            '<li data-list="bullet">mass — mass in kilograms (number, for dynamic objects).</li>' +
            '<li data-list="bullet">friction — friction coefficient (0–1).</li>' +
            '<li data-list="bullet">restitution — bounciness (0–1).</li>' +
            '<li data-list="bullet">centre_of_mass_offset_os — center of mass offset (Vec3f).</li>' +
            '<li data-list="bullet">audio_source_url — audio URL (string).</li>' +
            '<li data-list="bullet">audio_volume — audio volume (number, default 1).</li>' +
            '<li data-list="bullet">Methods:</li>' +
            '<li data-list="bullet">getNumMaterials() — number of materials.</li>' +
            '<li data-list="bullet">getMaterial(index) — returns the material by index.</li>' +
            '<li data-list="bullet"><strong>Material</strong></li>' +
            '<li data-list="bullet">Attributes:</li>' +
            '<li data-list="bullet">colour — color (Vec3f, sRGB).</li>' +
            '<li data-list="bullet">colour_texture_url — color texture URL (string).</li>' +
            '<li data-list="bullet">emission_rgb — emission color (Vec3f, sRGB).</li>' +
            '<li data-list="bullet">emission_texture_url — emission texture URL (string).</li>' +
            '<li data-list="bullet">normal_map_url — normal map URL (string).</li>' +
            '<li data-list="bullet">roughness_val — roughness (0–1).</li>' +
            '<li data-list="bullet">roughness_texture_url — roughness texture URL (string).</li>' +
            '<li data-list="bullet">metallic_fraction_val — metallic value (0–1).</li>' +
            '<li data-list="bullet">opacity_val — opacity (0–1).</li>' +
            '<li data-list="bullet">tex_matrix — texture matrix (Matrix2f, default {1, 0, 0, 1}).</li>' +
            '<li data-list="bullet">emission_lum_flux_or_lum — luminous flux or luminance (number).</li>' +
            '<li data-list="bullet">hologram — hologram rendering (true/false).</li>' +
            '<li data-list="bullet">double_sided — double-sided rendering (true/false).</li>' +
            '<li data-list="bullet"><strong>Avatar</strong></li>' +
            '<li data-list="bullet">Attributes:</li>' +
            '<li data-list="bullet">pos — position (Vec3d, roughly 1.67 m above the surface).</li>' +
            '<li data-list="bullet">name — username (string).</li>' +
            '<li data-list="bullet">linear_velocity — velocity (Vec3f, m/s).</li>' +
            '<li data-list="bullet">vehicle_inside — vehicle object (Object or nil). <strong style="color: rgb(31, 0, 255);"><a href="/scripts" style="color: rgb(31, 0, 255);">Luau script examples</a></strong></li>' +
            "</ul>"
        ]
      }
    ],
    "63811825": [
      {
        selector: "#rec870773520 .t167__text",
        html: [
          '<strong style="font-size: 24px;">Luau script examples in Metasiberia</strong><br /><br />' +
            "<strong>Welcome message on object touch</strong><br />" +
            "<strong>A simple script that shows the user a personalized message when their avatar touches an object.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserTouchedObject(avatar, object) showMessageToUser("Hello, " .. avatar.name .. ", you touched the object!", avatar)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "When the avatar touches the object, for example a red cube, a greeting with their name appears on screen.<br /><br />" +
            "<strong>Jump pad</strong><br />" +
            "<strong>An object that launches the avatar into the air when touched.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserTouchedObject(avatar, object)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local v = avatar.linear_velocity</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local new_v = Vec3f(v.x, v.y, 10.0) -- Launch upward at 10 m/s</span><br />' +
            '<span style="color: rgb(20, 0, 252);">avatar.linear_velocity = new_v</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "On contact, the avatar receives a vertical impulse that creates a jump effect.<br /><br />" +
            "<strong>Changing text when entering or leaving a parcel</strong><br />" +
            "<strong>A script for a text object that changes its text and color depending on whether the user has entered or left the parcel.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserEnteredParcel(avatar, object, parcel)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">object.content = "User entered the parcel"</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local mat = object:getMaterial(0)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">mat.colour = Vec3f(0, 1, 0) -- Green color</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br /><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserExitedParcel(avatar, object, parcel)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">object.content = "User left the parcel"</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local mat = object:getMaterial(0)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">mat.colour = Vec3f(1, 0.1, 0) -- Reddish color</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "The text updates, while the object material turns green on entry and red on exit.<br /><br />" +
            "<strong>Changing object color on enter and exit</strong><br />" +
            "<strong>This script changes the color of an object when the avatar enters or leaves a parcel.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserEnteredParcel(avatar, object, parcel)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local mat = object:getMaterial(0)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">mat.colour = Vec3f(1, 0, 0) -- Red color</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br /><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserExitedParcel(avatar, object, parcel)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local mat = object:getMaterial(0)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">mat.colour = Vec3f(0, 1, 0) -- Green color</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "The object turns red on entry and green on exit.<br /><br />" +
            "<strong>Object following nearby users</strong><br />" +
            "<strong>An object that moves toward the nearest avatar while the avatar stays within range.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local near_user = nil</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onTimerEvent(object)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">if near_user then</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local dx = near_user.pos.x - object.pos.x</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local dy = near_user.pos.y - object.pos.y</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local dz = (near_user.pos.z - 1.68) - object.pos.z -- Account for avatar height</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local d = math.sqrt(dx*dx + dy*dy + dz*dz)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">if d &gt; 1.0 then</span><br />' +
            '<span style="color: rgb(20, 0, 252);">dx = dx / d</span><br />' +
            '<span style="color: rgb(20, 0, 252);">dy = dy / d</span><br />' +
            '<span style="color: rgb(20, 0, 252);">dz = dz / d</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local step_dist = 0.4</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local newx = object.pos.x + dx * step_dist</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local newy = object.pos.y + dy * step_dist</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local newz = object.pos.z + dz * step_dist</span><br />' +
            '<span style="color: rgb(20, 0, 252);">object.pos = Vec3d(newx, newy, newz)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            '<span style="color: rgb(20, 0, 252);">createTimer(onTimerEvent, 0.1, true) -- Update every 0.1 seconds</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserMovedNearToObject(avatar, object)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">print("Avatar nearby!")</span><br />' +
            '<span style="color: rgb(20, 0, 252);">near_user = avatar</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserMovedAwayFromObject(avatar, object)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">print("Avatar left!")</span><br />' +
            '<span style="color: rgb(20, 0, 252);">near_user = nil</span><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br />' +
            "The object moves smoothly toward the avatar in 0.4 m steps while the avatar remains within a 20-meter radius, and stops once the avatar moves away.<br /><br />" +
            "<strong>Teleportation</strong><br />" +
            "<strong>A script that teleports the user to a specific position in space.</strong><br /><br />" +
            '<span style="color: rgb(20, 0, 252);">--lua</span><br />' +
            '<span style="color: rgb(20, 0, 252);">-- Teleport the user and optionally print a message</span><br />' +
            '<span style="color: rgb(20, 0, 252);">function onUserTouchedObject(avatar, ob)</span><br />' +
            '<span style="color: rgb(20, 0, 252);">print("onUserTouchedObject!!!!!")</span><br /><br />' +
            '<span style="color: rgb(20, 0, 252);">-- Move the user to new coordinates</span><br />' +
            '<span style="color: rgb(20, 0, 252);">local p = avatar.pos</span><br />' +
            '<span style="color: rgb(20, 0, 252);">p.x = -4265.</span><br />' +
            '<span style="color: rgb(20, 0, 252);">p.y = -424.8</span><br />' +
            '<span style="color: rgb(20, 0, 252);">p.z = 1434.63</span><br />' +
            '<span style="color: rgb(20, 0, 252);">avatar.pos = p</span><br /><br />' +
            '<span style="color: rgb(20, 0, 252);">end</span><br /><br /><br /><br />'
        ]
      }
    ]
  };
  var LEAF_TEXT_RULES = [
    { match: function(text) { return text === "[Главная]" || text === "[Main]"; }, values: { ru: "[Главная]", en: "[Main]" } },
    { match: function(text) { return text === "[вебклиент]" || text === "[webclient]"; }, values: { ru: "[вебклиент]", en: "[webclient]" } },
    { match: function(text) { return text === "[Скачать Metasiberia beta]" || text === "[Download Metasiberia beta]" || text === "[Downlod Metasiberia beta]"; }, values: { ru: "[Скачать Metasiberia beta]", en: "[Download Metasiberia beta]" } },
    { match: function(text) { return text === "[участки]" || text === "[parcels]"; }, values: { ru: "[участки]", en: "[parcels]" } },
    { match: function(text) { return /^\[PAR/i.test(text) || text === "[УЧАСТКИ]"; }, values: { ru: "[УЧАСТКИ]", en: "[PARCELS]" } },
    { match: function(text) { return text === "[магазин]" || text === "[store]"; }, values: { ru: "[магазин]", en: "[store]" } },
    { match: function(text) { return text === "[админ-панель]" || text === "[admin panel]"; }, values: { ru: "[админ-панель]", en: "[admin panel]" } },
    { match: function(text) { return text === "[карта]" || text === "[map]"; }, values: { ru: "[карта]", en: "[map]" } },
    { match: function(text) { return text === "Sandbox. Parcel #31" || text === "Песочница. Участок #31"; }, values: { ru: "Песочница. Участок #31", en: "Sandbox. Parcel #31" } },
    { match: function(text) { return text === "Вид на основной мир Metasiberia." || text === "View of the main Metasiberia world."; }, values: { ru: "Вид на основной мир Metasiberia.", en: "View of the main Metasiberia world." } },
    { match: function(text) { return text === "Скриптинг в Metasiberia." || text === "Scripting in Metasiberia."; }, values: { ru: "Скриптинг в Metasiberia.", en: "Scripting in Metasiberia." } },
    { match: function(text) { return text === "Metasiberia Verse Morpher NFT" || text === "Морфер NFT вселенной Metasiberia"; }, values: { ru: "Морфер NFT вселенной Metasiberia", en: "Metasiberia Verse Morpher NFT" } },
    { match: function(text) { return text === "Sphere" || text === "Сфера"; }, values: { ru: "Сфера", en: "Sphere" } },
    { match: function(text) { return text === "Cube" || text === "Куб"; }, values: { ru: "Куб", en: "Cube" } },
    { match: function(text) { return text === "Torus" || text === "Тор"; }, values: { ru: "Тор", en: "Torus" } },
    { match: function(text) { return text === "Icosahedron" || text === "Икосаэдр"; }, values: { ru: "Икосаэдр", en: "Icosahedron" } },
    { match: function(text) { return text === "Teapot" || text === "Чайник"; }, values: { ru: "Чайник", en: "Teapot" } },
    { match: function(text) { return text === "DNA"; }, values: { ru: "DNA", en: "DNA" } },
    { match: function(text) { return text === "Help" || text === "Помощь"; }, values: { ru: "Помощь", en: "Help" } },
    { match: function(text) { return text.indexOf("Particle Basics") === 0 || text.indexOf("Основы частиц") === 0; }, values: { ru: "Основы частиц ▼", en: "Particle Basics ▼" } },
    { match: function(text) { return text.indexOf("Visual Effects") === 0 || text.indexOf("Визуальные эффекты") === 0; }, values: { ru: "Визуальные эффекты ▼", en: "Visual Effects ▼" } },
    { match: function(text) { return text.indexOf("Motion & Shape") === 0 || text.indexOf("Движение и форма") === 0; }, values: { ru: "Движение и форма ▼", en: "Motion & Shape ▼" } },
    { match: function(text) { return text.indexOf("Physics & Scale") === 0 || text.indexOf("Физика и масштаб") === 0; }, values: { ru: "Физика и масштаб ▼", en: "Physics & Scale ▼" } },
    { match: function(text) { return text.indexOf("Variations") === 0 || text.indexOf("Вариации") === 0; }, values: { ru: "Вариации ▼", en: "Variations ▼" } },
    { match: function(text) { return text === "Made by Denis Shipilov for Metasiberia using Three.js & Grok" || text === "Сделано Denis Shipilov для Metasiberia с помощью Three.js и Grok"; }, values: { ru: "Сделано Denis Shipilov для Metasiberia с помощью Three.js и Grok", en: "Made by Denis Shipilov for Metasiberia using Three.js & Grok" } },
    { match: function(text) { return text === "BASICS" || text === "ОСНОВЫ"; }, values: { ru: "ОСНОВЫ", en: "BASICS" } },
    { match: function(text) { return text === "Why typography matters?" || text === "Почему типографика важна?"; }, values: { ru: "Почему типографика важна?", en: "Why typography matters?" } },
    { match: function(text) { return text === "Particle Size (0.01–0.1):" || text === "Размер частиц (0.01–0.1):"; }, values: { ru: "Размер частиц (0.01–0.1):", en: "Particle Size (0.01–0.1):" } },
    { match: function(text) { return text === "Rotation Speed (0–0.5):" || text === "Скорость вращения (0–0.5):"; }, values: { ru: "Скорость вращения (0–0.5):", en: "Rotation Speed (0–0.5):" } },
    { match: function(text) { return text === "Particle Color:" || text === "Цвет частиц:"; }, values: { ru: "Цвет частиц:", en: "Particle Color:" } },
    { match: function(text) { return text === "Particle Density (5000–50000):" || text === "Плотность частиц (5000–50000):"; }, values: { ru: "Плотность частиц (5000–50000):", en: "Particle Density (5000–50000):" } },
    { match: function(text) { return text === "Mass Influence (0–1):" || text === "Влияние массы (0–1):"; }, values: { ru: "Влияние массы (0–1):", en: "Mass Influence (0–1):" } },
    { match: function(text) { return text === "Orbital Velocity (0–0.5):" || text === "Орбитальная скорость (0–0.5):"; }, values: { ru: "Орбитальная скорость (0–0.5):", en: "Orbital Velocity (0–0.5):" } },
    { match: function(text) { return text === "Bloom Strength (0–2):" || text === "Сила свечения (0–2):"; }, values: { ru: "Сила свечения (0–2):", en: "Bloom Strength (0–2):" } },
    { match: function(text) { return text === "Trail Length (0–1):" || text === "Длина следа (0–1):"; }, values: { ru: "Длина следа (0–1):", en: "Trail Length (0–1):" } },
    { match: function(text) { return text === "Star Flare (0–1):" || text === "Звёздные блики (0–1):"; }, values: { ru: "Звёздные блики (0–1):", en: "Star Flare (0–1):" } },
    { match: function(text) { return text === "Cosmic Wind (0–0.3):" || text === "Космический ветер (0–0.3):"; }, values: { ru: "Космический ветер (0–0.3):", en: "Cosmic Wind (0–0.3):" } },
    { match: function(text) { return text === "Warp Speed (0–1):" || text === "Скорость варпа (0–1):"; }, values: { ru: "Скорость варпа (0–1):", en: "Warp Speed (0–1):" } },
    { match: function(text) { return text === "Morph Speed (0.5–3):" || text === "Скорость морфа (0.5–3):"; }, values: { ru: "Скорость морфа (0.5–3):", en: "Morph Speed (0.5–3):" } },
    { match: function(text) { return text === "Randomness (0–0.5):" || text === "Случайность (0–0.5):"; }, values: { ru: "Случайность (0–0.5):", en: "Randomness (0–0.5):" } },
    { match: function(text) { return text === "Twirl Intensity (0–1):" || text === "Интенсивность завихрения (0–1):"; }, values: { ru: "Интенсивность завихрения (0–1):", en: "Twirl Intensity (0–1):" } },
    { match: function(text) { return text === "Pulse Effect (0–1):" || text === "Эффект пульсации (0–1):"; }, values: { ru: "Эффект пульсации (0–1):", en: "Pulse Effect (0–1):" } },
    { match: function(text) { return text === "Black Hole Pull (0–0.2):" || text === "Притяжение чёрной дыры (0–0.2):"; }, values: { ru: "Притяжение чёрной дыры (0–0.2):", en: "Black Hole Pull (0–0.2):" } },
    { match: function(text) { return text === "Galaxy Spiral (0–1):" || text === "Спираль галактики (0–1):"; }, values: { ru: "Спираль галактики (0–1):", en: "Galaxy Spiral (0–1):" } },
    { match: function(text) { return text === "Meteor Shower (0–1):" || text === "Метеоритный дождь (0–1):"; }, values: { ru: "Метеоритный дождь (0–1):", en: "Meteor Shower (0–1):" } },
    { match: function(text) { return text === "Gravity Pull (0–0.1):" || text === "Гравитационное притяжение (0–0.1):"; }, values: { ru: "Гравитационное притяжение (0–0.1):", en: "Gravity Pull (0–0.1):" } },
    { match: function(text) { return text === "Shape Scale (0.5–2):" || text === "Масштаб формы (0.5–2):"; }, values: { ru: "Масштаб формы (0.5–2):", en: "Shape Scale (0.5–2):" } },
    { match: function(text) { return text === "Nebula Density (0–1):" || text === "Плотность туманности (0–1):"; }, values: { ru: "Плотность туманности (0–1):", en: "Nebula Density (0–1):" } },
    { match: function(text) { return text === "Dark Matter (0–0.5):" || text === "Тёмная материя (0–0.5):"; }, values: { ru: "Тёмная материя (0–0.5):", en: "Dark Matter (0–0.5):" } },
    { match: function(text) { return text === "Color Variation (0–0.5):" || text === "Вариация цвета (0–0.5):"; }, values: { ru: "Вариация цвета (0–0.5):", en: "Color Variation (0–0.5):" } },
    { match: function(text) { return text === "Noise Amplitude (0–0.2):" || text === "Амплитуда шума (0–0.2):"; }, values: { ru: "Амплитуда шума (0–0.2):", en: "Noise Amplitude (0–0.2):" } }
  ];

  function normalizeLanguage(language) {
    return language === "en" ? "en" : "ru";
  }

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function getSavedLanguage() {
    try {
      return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return DEFAULT_LANGUAGE;
    }
  }

  function setSavedLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, normalizeLanguage(language));
    } catch (error) {
      /* Ignore storage errors. */
    }
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "#rec872696359 .t450__menu__content_lang-ready{display:flex;align-items:center;justify-content:flex-end;gap:8px;}",
      "#rec872696359 ." + SWITCHER_CLASS + "{display:inline-flex;align-items:center;gap:4px;padding:4px 5px;border-radius:999px;background:rgba(7,11,18,0.58);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 14px 28px rgba(0,0,0,0.2);}",
      "#rec872696359 .t450__lang-icon{display:flex;align-items:center;justify-content:center;width:18px;height:18px;color:#ffffff;opacity:0.88;}",
      "#rec872696359 .t450__lang-button{appearance:none;border:0;background:transparent;color:rgba(255,255,255,0.72);font:700 10px/1 'Source Code Pro',monospace;letter-spacing:0.1em;text-transform:uppercase;border-radius:999px;min-width:32px;height:28px;padding:0 8px;cursor:pointer;transition:background-color .18s ease,color .18s ease,box-shadow .18s ease;}",
      "#rec872696359 .t450__lang-button:hover{color:#ffffff;background:rgba(255,255,255,0.1);}",
      "#rec872696359 .t450__lang-button.is-active{background:#ffffff;color:#06080c;box-shadow:0 8px 16px rgba(255,255,255,0.18);}",
      "#rec872696359 .t450__lang-button:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}",
      "@media screen and (max-width:640px){#rec872696359 .t450__menu__content_lang-ready{gap:6px;}#rec872696359 ." + SWITCHER_CLASS + "{padding:3px 4px;}#rec872696359 .t450__lang-icon{width:16px;height:16px;}#rec872696359 .t450__lang-button{min-width:30px;height:26px;font-size:9px;padding:0 7px;}}"
    ].join("");

    document.head.appendChild(style);
  }

  function buildSwitcher() {
    var switcher = document.createElement("div");
    switcher.className = SWITCHER_CLASS;
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Language switch");
    switcher.innerHTML =
      '<span class="t450__lang-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.2"/>' +
      '<path d="M2.2 8H13.8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
      '<path d="M8 1.8C9.6 3.45 10.5 5.64 10.5 8C10.5 10.36 9.6 12.55 8 14.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
      '<path d="M8 1.8C6.4 3.45 5.5 5.64 5.5 8C5.5 10.36 6.4 12.55 8 14.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
      "</svg></span>";

    [
      { language: "ru", label: "RU", title: "Русский" },
      { language: "en", label: "EN", title: "English" }
    ].forEach(function(item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "t450__lang-button";
      button.dataset.language = item.language;
      button.textContent = item.label;
      button.title = item.title;
      button.setAttribute("aria-label", item.title);
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", function() {
        setSavedLanguage(item.language);
        applyLanguage(item.language);
      });
      switcher.appendChild(button);
    });

    return switcher;
  }

  function updateSwitcher(language) {
    document.querySelectorAll("#rec872696359 .t450__lang-button").forEach(function(button) {
      var isActive = button.dataset.language === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function updateMenuLabels(language) {
    document.querySelectorAll("#rec872696359 .t-menu__link-item").forEach(function(link) {
      var itemNumber = link.getAttribute("data-menu-item-number");
      var copy = MENU_LABELS[itemNumber];

      if (copy) {
        link.textContent = copy[language];
      }
    });
  }

  function rememberOriginal(node) {
    if (!originalHtml.has(node)) {
      originalHtml.set(node, node.innerHTML);
    }
  }

  function restorePageBlocks(pageId) {
    var blocks = PAGE_HTML_TRANSLATIONS[pageId] || [];

    blocks.forEach(function(block) {
      document.querySelectorAll(block.selector).forEach(function(node) {
        if (originalHtml.has(node)) {
          node.innerHTML = originalHtml.get(node);
        }
      });
    });
  }

  function applyEnglishPageBlocks(pageId) {
    var blocks = PAGE_HTML_TRANSLATIONS[pageId] || [];

    blocks.forEach(function(block) {
      var nodes = Array.from(document.querySelectorAll(block.selector));
      var values = Array.isArray(block.html) ? block.html : [block.html];

      nodes.forEach(function(node, index) {
        rememberOriginal(node);
        node.innerHTML = values[index % values.length];
      });
    });
  }

  function setFirstTextNode(node, value) {
    var textNodes = Array.from(node.childNodes).filter(function(child) {
      return child.nodeType === Node.TEXT_NODE && normalizeText(child.nodeValue);
    });

    if (textNodes.length) {
      textNodes.forEach(function(child, index) {
        child.nodeValue = index === 0 ? value : "";
      });
      return;
    }

    node.insertBefore(document.createTextNode(value), node.firstChild || null);
  }

  function applySelectorUpdates(language) {
    SELECTOR_UPDATES.forEach(function(update) {
      document.querySelectorAll(update.selector).forEach(function(node) {
        var value = update.values[language];

        if (typeof value !== "string") {
          return;
        }

        if (update.type === "html") {
          node.innerHTML = value;
          return;
        }

        if (update.type === "firstText") {
          setFirstTextNode(node, value);
          return;
        }

        node.textContent = value;
      });
    });
  }

  function applyLeafTextRules(language) {
    document.querySelectorAll("body *").forEach(function(node) {
      if (
        node.closest("." + SWITCHER_CLASS) ||
        node.tagName === "SCRIPT" ||
        node.tagName === "STYLE" ||
        node.childElementCount !== 0
      ) {
        return;
      }

      var text = normalizeText(node.textContent);

      if (!text) {
        return;
      }

      var rule = LEAF_TEXT_RULES.find(function(candidate) {
        return candidate.match(text);
      });

      if (rule) {
        node.textContent = rule.values[language];
      }
    });
  }

  function updatePageTitle(language) {
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";
    var copy = PAGE_TITLES[pageId];

    if (copy) {
      document.title = copy[language];
    }
  }

  function updateSharedUiLanguage(language) {
    var isRussian = language === "ru";
    var repositoryUrl = "https://github.com/shipilovden/sub-metasiberia";
    var skipLinkLabel = isRussian ? "К основному контенту" : "Skip to main content";
    var sliderLabel = isRussian ? "Слайдер" : "Slider";
    var previousSlideLabel = isRussian ? "Предыдущий слайд" : "Previous slide";
    var nextSlideLabel = isRussian ? "Следующий слайд" : "Next slide";
    var socialLinksLabel = isRussian ? "Соц. сети" : "Social links";

    document.querySelectorAll('a[href="#t-main-content"]').forEach(function(node) {
      node.textContent = skipLinkLabel;
      node.setAttribute("aria-label", skipLinkLabel);
    });

    document.querySelectorAll(".t-sociallinks__wrapper").forEach(function(node) {
      node.setAttribute("aria-label", socialLinksLabel);
    });

    document
      .querySelectorAll('a[href="https://github.com/glaretechnologies/substrata"]')
      .forEach(function(node) {
        node.setAttribute("href", repositoryUrl);
      });

    document.querySelectorAll(".t-slds").forEach(function(node) {
      node.setAttribute("aria-label", sliderLabel);
      node.setAttribute("aria-roledescription", isRussian ? "карусель" : "carousel");
    });

    document.querySelectorAll(".t-slds__arrow_wrapper-left button").forEach(function(node) {
      node.setAttribute("aria-label", previousSlideLabel);
    });

    document.querySelectorAll(".t-slds__arrow_wrapper-right button").forEach(function(node) {
      node.setAttribute("aria-label", nextSlideLabel);
    });

    document.querySelectorAll(".t-slds__bullet[data-slide-bullet-for] button").forEach(function(node) {
      var index = node.parentElement ? node.parentElement.getAttribute("data-slide-bullet-for") : "";

      if (index) {
        node.setAttribute(
          "aria-label",
          isRussian ? "Перейти к слайду " + index : "Go to slide " + index
        );
      }
    });

    document.querySelectorAll(".t-slds__item[data-slide-index]").forEach(function(node) {
      var index = parseInt(node.getAttribute("data-slide-index"), 10);
      var slider = node.closest(".t-slds");
      var total = 0;

      if (slider) {
        total = new Set(
          Array.from(slider.querySelectorAll(".t-slds__item[data-slide-index]"))
            .map(function(slideNode) {
              return slideNode.getAttribute("data-slide-index");
            })
            .filter(Boolean)
        ).size;
      }

      if (index && total) {
        node.setAttribute("aria-label", isRussian ? index + " из " + total : index + " of " + total);
      }
    });
  }

  function updateAccessibility(language) {
    var burger = document.querySelector("#rec872696359 .t-menuburger");
    var closeButton = document.querySelector("#rec872696359 .t450__close-button");
    var switcher = document.querySelector("#rec872696359 ." + SWITCHER_CLASS);

    if (burger) {
      burger.setAttribute(
        "aria-label",
        language === "ru" ? "Навигационное меню" : "Navigation menu"
      );
    }

    if (closeButton) {
      closeButton.setAttribute(
        "aria-label",
        language === "ru" ? "Закрыть меню" : "Close menu"
      );
    }

    if (switcher) {
      switcher.setAttribute("aria-label", language === "ru" ? "Переключение языка" : "Language switch");
    }

    updateSharedUiLanguage(language);
  }

  function applyLanguage(language) {
    var normalizedLanguage = normalizeLanguage(language);
    var allRecords = document.getElementById("allrecords");
    var pageId = allRecords ? allRecords.getAttribute("data-tilda-page-id") : "";

    document.documentElement.setAttribute("lang", normalizedLanguage);
    document.documentElement.setAttribute("data-site-language", normalizedLanguage);

    restorePageBlocks(pageId);

    if (normalizedLanguage === "en") {
      applyEnglishPageBlocks(pageId);
    }

    updateMenuLabels(normalizedLanguage);
    applySelectorUpdates(normalizedLanguage);
    applyLeafTextRules(normalizedLanguage);
    updatePageTitle(normalizedLanguage);
    updateAccessibility(normalizedLanguage);
    updateSwitcher(normalizedLanguage);
  }

  function scheduleDelayedLanguageRefresh() {
    if (scheduleDelayedLanguageRefresh.done) {
      return;
    }

    scheduleDelayedLanguageRefresh.done = true;

    [300, 1200, 2600, 4200].forEach(function(delay) {
      window.setTimeout(function() {
        applyLanguage(getSavedLanguage());
      }, delay);
    });
  }

  function mountSwitcher() {
    var menuContent = document.querySelector("#rec872696359 .t450__menu__content");
    var burgerContainer = menuContent ? menuContent.querySelector(".t450__burger_container") : null;

    if (!menuContent || !burgerContainer) {
      return false;
    }

    injectStyles();
    menuContent.classList.add("t450__menu__content_lang-ready");

    if (!menuContent.querySelector("." + SWITCHER_CLASS)) {
      menuContent.insertBefore(buildSwitcher(), burgerContainer);
    }

    applyLanguage(getSavedLanguage());
    scheduleDelayedLanguageRefresh();
    return true;
  }

  var attempts = 0;

  function boot() {
    if (mountSwitcher()) {
      return;
    }

    attempts += 1;

    if (attempts < 20) {
      window.setTimeout(boot, 150);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.addEventListener("load", boot);
})();
