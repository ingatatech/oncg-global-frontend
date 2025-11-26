import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary border-none text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/images/Logo2.jpg"
                alt="ONCG"
                width={200}
                height={80}
                className="h-12 w-auto"

              />
            </Link>
            <p className="text-primary-foreground/80 mb-6 text-pretty leading-relaxed">
              ONCG delivers expert auditing, advisory services, and strategic consultancy to help
              businesses achieve compliance, efficiency, and sustainable growth.
            </p>
            
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">
                  Leadership
                </Link>
              </li>
             
              <li>
                <Link href="/insights" className="text-sm text-primary-foreground/80 hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
           
            </ul>
          </div>

            {/* Contact Info */}
            <div className="space-y-3">
            <h3 className="font-semibold text-white mb-4">Our Contacts</h3>

              <div className="flex items-center space-x-3 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:oncgglobal@gmail.com" className="hover:text-white transition-colors">
                  oncgglobal@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+250788303061" className="hover:text-white transition-colors">
                  +(250) 788 303 061
                </a>
              </div>
               <div className="flex items-center space-x-3 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+250780066190" className="hover:text-white transition-colors">
                 +(250) 780 066 190
                </a>
              </div>
             
            </div>
        </div>

        {/* Bottom Section */}
       <div className="mt-0 pt-4">
  <div className="flex flex-col md:flex-row justify-between items-center pt-2 border-t border-primary-foreground/20">
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
      <div className="text-sm text-primary-foreground/80">
        © {new Date().getFullYear()} ONCG. All rights reserved.
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <span className="text-sm text-primary-foreground/80">
        Developed by <span className="font-semibold text-white">The Ingata Technologies Ltd</span>
      </span>

      {/* Social Links */}
      <div className="flex items-center space-x-4">
        <a
          href="https://www.linkedin.com/company/oncg-global/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-primary transition-all duration-200"
          aria-label="Follow us on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href="https://x.com/GlobalOncg25"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-accent hover:text-primary transition-all duration-200"
          aria-label="Follow us on Twitter"
        >
           <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
        </a>
   
      </div>
    </div>
  </div>
</div>

      </div>
    </footer>
  )
}