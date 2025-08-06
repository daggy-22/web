// components/ui/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-300 text-base-content mt-8">
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557..."></path>
            </svg>
          </a>
        </div>
      </div>
      <div>
        <p>Copyright © 2025 - All right reserved</p>
      </div>
    </footer>
  );
}
