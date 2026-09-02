# Thai Tire — GitHub Pages package

This folder is ready to publish from the root of a GitHub repository.

## Publish

1. Upload every file and folder here to the repository root.
2. In **Settings → Pages**, choose **Deploy from a branch**, `main`, and `/ (root)`.
3. In GitHub Pages, set the custom domain to `thaitbrtyres.com` and enable HTTPS after DNS is active.

The included `CNAME` and `.nojekyll` files are required. Clean URLs use folders with `index.html`, so Apache, PHP, and `.htaccess` are not needed.

## Contact form

The email forms use FormSubmit and deliver to `info@thaiitire.com`. The first live submission sends an activation email to that address. Open it and confirm the form once. If Cloudflare Email Routing forwards `info@thaiitire.com` to Gmail, the activation message and enquiries will arrive there.

FormSubmit must remain the form processor because GitHub Pages cannot run PHP. The success redirect is `/thank-you/`.
