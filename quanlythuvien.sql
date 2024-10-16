PGDMP  9                	    |            quanlythuvien    16.4    16.4 ;    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16399    quanlythuvien    DATABASE     �   CREATE DATABASE quanlythuvien WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Vietnamese_Vietnam.1258';
    DROP DATABASE quanlythuvien;
                postgres    false            �            1259    16484    danhmuc    TABLE     o   CREATE TABLE public.danhmuc (
    madanhmuc bigint NOT NULL,
    tendanhmuc character varying(255) NOT NULL
);
    DROP TABLE public.danhmuc;
       public         heap    postgres    false            �            1259    16483    danhmuc_madanhmuc_seq    SEQUENCE     �   CREATE SEQUENCE public.danhmuc_madanhmuc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.danhmuc_madanhmuc_seq;
       public          postgres    false    216            �           0    0    danhmuc_madanhmuc_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.danhmuc_madanhmuc_seq OWNED BY public.danhmuc.madanhmuc;
          public          postgres    false    215            �            1259    16540    ghichepmuonsach    TABLE     �   CREATE TABLE public.ghichepmuonsach (
    maghichep bigint NOT NULL,
    mathanhvien integer,
    masach bigint,
    ngaymuon date NOT NULL,
    ngayhentra date NOT NULL,
    ngaytra date,
    trangthai character varying(255) NOT NULL
);
 #   DROP TABLE public.ghichepmuonsach;
       public         heap    postgres    false            �            1259    16539    ghichepmuonsach_maghichep_seq    SEQUENCE     �   CREATE SEQUENCE public.ghichepmuonsach_maghichep_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.ghichepmuonsach_maghichep_seq;
       public          postgres    false    226            �           0    0    ghichepmuonsach_maghichep_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.ghichepmuonsach_maghichep_seq OWNED BY public.ghichepmuonsach.maghichep;
          public          postgres    false    225            �            1259    16557 	   nguoidung    TABLE       CREATE TABLE public.nguoidung (
    mand bigint NOT NULL,
    hoten character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    vaitro character varying(255) NOT NULL,
    sodienthoai character varying(255),
    matkhau character varying(255) NOT NULL
);
    DROP TABLE public.nguoidung;
       public         heap    postgres    false            �            1259    16556    nguoidung_mand_seq    SEQUENCE     �   CREATE SEQUENCE public.nguoidung_mand_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.nguoidung_mand_seq;
       public          postgres    false    228            �           0    0    nguoidung_mand_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.nguoidung_mand_seq OWNED BY public.nguoidung.mand;
          public          postgres    false    227            �            1259    16500 
   nhaxuatban    TABLE     x   CREATE TABLE public.nhaxuatban (
    manhaxuatban bigint NOT NULL,
    tennhaxuatban character varying(255) NOT NULL
);
    DROP TABLE public.nhaxuatban;
       public         heap    postgres    false            �            1259    16499    nhaxuatban_manhaxuatban_seq    SEQUENCE     �   CREATE SEQUENCE public.nhaxuatban_manhaxuatban_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.nhaxuatban_manhaxuatban_seq;
       public          postgres    false    220            �           0    0    nhaxuatban_manhaxuatban_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.nhaxuatban_manhaxuatban_seq OWNED BY public.nhaxuatban.manhaxuatban;
          public          postgres    false    219            �            1259    16507    sach    TABLE     K  CREATE TABLE public.sach (
    masach bigint NOT NULL,
    tieude character varying(255) NOT NULL,
    matacgia integer,
    manhaxuatban integer,
    namxuatban integer,
    isbn character varying(255),
    madanhmuc integer,
    soluong integer NOT NULL,
    soluongconlai integer NOT NULL,
    hinhanh character varying(255)
);
    DROP TABLE public.sach;
       public         heap    postgres    false            �            1259    16506    sach_masach_seq    SEQUENCE     �   CREATE SEQUENCE public.sach_masach_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sach_masach_seq;
       public          postgres    false    222            �           0    0    sach_masach_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sach_masach_seq OWNED BY public.sach.masach;
          public          postgres    false    221            �            1259    16491    tacgia    TABLE     �   CREATE TABLE public.tacgia (
    matacgia bigint NOT NULL,
    tentacgia character varying(255) NOT NULL,
    tieusu character varying(255)
);
    DROP TABLE public.tacgia;
       public         heap    postgres    false            �            1259    16490    tacgia_matacgia_seq    SEQUENCE     �   CREATE SEQUENCE public.tacgia_matacgia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.tacgia_matacgia_seq;
       public          postgres    false    218            �           0    0    tacgia_matacgia_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.tacgia_matacgia_seq OWNED BY public.tacgia.matacgia;
          public          postgres    false    217            �            1259    16531 	   thanhvien    TABLE       CREATE TABLE public.thanhvien (
    mathanhvien bigint NOT NULL,
    hoten character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    sodienthoai character varying(255),
    diachi character varying(255),
    ngaydangkythanhvien character varying(255) NOT NULL
);
    DROP TABLE public.thanhvien;
       public         heap    postgres    false            �            1259    16530    thanhvien_mathanhvien_seq    SEQUENCE     �   CREATE SEQUENCE public.thanhvien_mathanhvien_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.thanhvien_mathanhvien_seq;
       public          postgres    false    224            �           0    0    thanhvien_mathanhvien_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.thanhvien_mathanhvien_seq OWNED BY public.thanhvien.mathanhvien;
          public          postgres    false    223            8           2604    16682    danhmuc madanhmuc    DEFAULT     v   ALTER TABLE ONLY public.danhmuc ALTER COLUMN madanhmuc SET DEFAULT nextval('public.danhmuc_madanhmuc_seq'::regclass);
 @   ALTER TABLE public.danhmuc ALTER COLUMN madanhmuc DROP DEFAULT;
       public          postgres    false    215    216    216            =           2604    16725    ghichepmuonsach maghichep    DEFAULT     �   ALTER TABLE ONLY public.ghichepmuonsach ALTER COLUMN maghichep SET DEFAULT nextval('public.ghichepmuonsach_maghichep_seq'::regclass);
 H   ALTER TABLE public.ghichepmuonsach ALTER COLUMN maghichep DROP DEFAULT;
       public          postgres    false    226    225    226            >           2604    16616    nguoidung mand    DEFAULT     p   ALTER TABLE ONLY public.nguoidung ALTER COLUMN mand SET DEFAULT nextval('public.nguoidung_mand_seq'::regclass);
 =   ALTER TABLE public.nguoidung ALTER COLUMN mand DROP DEFAULT;
       public          postgres    false    227    228    228            :           2604    16650    nhaxuatban manhaxuatban    DEFAULT     �   ALTER TABLE ONLY public.nhaxuatban ALTER COLUMN manhaxuatban SET DEFAULT nextval('public.nhaxuatban_manhaxuatban_seq'::regclass);
 F   ALTER TABLE public.nhaxuatban ALTER COLUMN manhaxuatban DROP DEFAULT;
       public          postgres    false    220    219    220            ;           2604    16755    sach masach    DEFAULT     j   ALTER TABLE ONLY public.sach ALTER COLUMN masach SET DEFAULT nextval('public.sach_masach_seq'::regclass);
 :   ALTER TABLE public.sach ALTER COLUMN masach DROP DEFAULT;
       public          postgres    false    222    221    222            9           2604    16575    tacgia matacgia    DEFAULT     r   ALTER TABLE ONLY public.tacgia ALTER COLUMN matacgia SET DEFAULT nextval('public.tacgia_matacgia_seq'::regclass);
 >   ALTER TABLE public.tacgia ALTER COLUMN matacgia DROP DEFAULT;
       public          postgres    false    217    218    218            <           2604    16662    thanhvien mathanhvien    DEFAULT     ~   ALTER TABLE ONLY public.thanhvien ALTER COLUMN mathanhvien SET DEFAULT nextval('public.thanhvien_mathanhvien_seq'::regclass);
 D   ALTER TABLE public.thanhvien ALTER COLUMN mathanhvien DROP DEFAULT;
       public          postgres    false    224    223    224            �          0    16484    danhmuc 
   TABLE DATA           8   COPY public.danhmuc (madanhmuc, tendanhmuc) FROM stdin;
    public          postgres    false    216   E       �          0    16540    ghichepmuonsach 
   TABLE DATA           s   COPY public.ghichepmuonsach (maghichep, mathanhvien, masach, ngaymuon, ngayhentra, ngaytra, trangthai) FROM stdin;
    public          postgres    false    226   �E       �          0    16557 	   nguoidung 
   TABLE DATA           U   COPY public.nguoidung (mand, hoten, email, vaitro, sodienthoai, matkhau) FROM stdin;
    public          postgres    false    228   !F       �          0    16500 
   nhaxuatban 
   TABLE DATA           A   COPY public.nhaxuatban (manhaxuatban, tennhaxuatban) FROM stdin;
    public          postgres    false    220   +G       �          0    16507    sach 
   TABLE DATA           �   COPY public.sach (masach, tieude, matacgia, manhaxuatban, namxuatban, isbn, madanhmuc, soluong, soluongconlai, hinhanh) FROM stdin;
    public          postgres    false    222   �G       �          0    16491    tacgia 
   TABLE DATA           =   COPY public.tacgia (matacgia, tentacgia, tieusu) FROM stdin;
    public          postgres    false    218   �I       �          0    16531 	   thanhvien 
   TABLE DATA           h   COPY public.thanhvien (mathanhvien, hoten, email, sodienthoai, diachi, ngaydangkythanhvien) FROM stdin;
    public          postgres    false    224   vK       �           0    0    danhmuc_madanhmuc_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.danhmuc_madanhmuc_seq', 10, true);
          public          postgres    false    215            �           0    0    ghichepmuonsach_maghichep_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.ghichepmuonsach_maghichep_seq', 96, true);
          public          postgres    false    225                        0    0    nguoidung_mand_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.nguoidung_mand_seq', 14, true);
          public          postgres    false    227                       0    0    nhaxuatban_manhaxuatban_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.nhaxuatban_manhaxuatban_seq', 14, true);
          public          postgres    false    219                       0    0    sach_masach_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sach_masach_seq', 40, true);
          public          postgres    false    221                       0    0    tacgia_matacgia_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.tacgia_matacgia_seq', 18, true);
          public          postgres    false    217                       0    0    thanhvien_mathanhvien_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.thanhvien_mathanhvien_seq', 10, true);
          public          postgres    false    223            @           2606    16684    danhmuc danhmuc_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.danhmuc
    ADD CONSTRAINT danhmuc_pkey PRIMARY KEY (madanhmuc);
 >   ALTER TABLE ONLY public.danhmuc DROP CONSTRAINT danhmuc_pkey;
       public            postgres    false    216            J           2606    16727 $   ghichepmuonsach ghichepmuonsach_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.ghichepmuonsach
    ADD CONSTRAINT ghichepmuonsach_pkey PRIMARY KEY (maghichep);
 N   ALTER TABLE ONLY public.ghichepmuonsach DROP CONSTRAINT ghichepmuonsach_pkey;
       public            postgres    false    226            L           2606    16618    nguoidung nguoidung_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT nguoidung_pkey PRIMARY KEY (mand);
 B   ALTER TABLE ONLY public.nguoidung DROP CONSTRAINT nguoidung_pkey;
       public            postgres    false    228            D           2606    16652    nhaxuatban nhaxuatban_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.nhaxuatban
    ADD CONSTRAINT nhaxuatban_pkey PRIMARY KEY (manhaxuatban);
 D   ALTER TABLE ONLY public.nhaxuatban DROP CONSTRAINT nhaxuatban_pkey;
       public            postgres    false    220            F           2606    16757    sach sach_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.sach
    ADD CONSTRAINT sach_pkey PRIMARY KEY (masach);
 8   ALTER TABLE ONLY public.sach DROP CONSTRAINT sach_pkey;
       public            postgres    false    222            B           2606    16577    tacgia tacgia_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.tacgia
    ADD CONSTRAINT tacgia_pkey PRIMARY KEY (matacgia);
 <   ALTER TABLE ONLY public.tacgia DROP CONSTRAINT tacgia_pkey;
       public            postgres    false    218            H           2606    16664    thanhvien thanhvien_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.thanhvien
    ADD CONSTRAINT thanhvien_pkey PRIMARY KEY (mathanhvien);
 B   ALTER TABLE ONLY public.thanhvien DROP CONSTRAINT thanhvien_pkey;
       public            postgres    false    224            N           2606    16566    nguoidung unique_email 
   CONSTRAINT     R   ALTER TABLE ONLY public.nguoidung
    ADD CONSTRAINT unique_email UNIQUE (email);
 @   ALTER TABLE ONLY public.nguoidung DROP CONSTRAINT unique_email;
       public            postgres    false    228            R           2606    16758 +   ghichepmuonsach ghichepmuonsach_masach_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ghichepmuonsach
    ADD CONSTRAINT ghichepmuonsach_masach_fkey FOREIGN KEY (masach) REFERENCES public.sach(masach);
 U   ALTER TABLE ONLY public.ghichepmuonsach DROP CONSTRAINT ghichepmuonsach_masach_fkey;
       public          postgres    false    222    4678    226            S           2606    16665 0   ghichepmuonsach ghichepmuonsach_mathanhvien_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ghichepmuonsach
    ADD CONSTRAINT ghichepmuonsach_mathanhvien_fkey FOREIGN KEY (mathanhvien) REFERENCES public.thanhvien(mathanhvien);
 Z   ALTER TABLE ONLY public.ghichepmuonsach DROP CONSTRAINT ghichepmuonsach_mathanhvien_fkey;
       public          postgres    false    226    224    4680            O           2606    16685    sach sach_madanhmuc_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sach
    ADD CONSTRAINT sach_madanhmuc_fkey FOREIGN KEY (madanhmuc) REFERENCES public.danhmuc(madanhmuc);
 B   ALTER TABLE ONLY public.sach DROP CONSTRAINT sach_madanhmuc_fkey;
       public          postgres    false    222    4672    216            P           2606    16653    sach sach_manhaxuatban_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sach
    ADD CONSTRAINT sach_manhaxuatban_fkey FOREIGN KEY (manhaxuatban) REFERENCES public.nhaxuatban(manhaxuatban);
 E   ALTER TABLE ONLY public.sach DROP CONSTRAINT sach_manhaxuatban_fkey;
       public          postgres    false    220    4676    222            Q           2606    16578    sach sach_matacgia_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.sach
    ADD CONSTRAINT sach_matacgia_fkey FOREIGN KEY (matacgia) REFERENCES public.tacgia(matacgia);
 A   ALTER TABLE ONLY public.sach DROP CONSTRAINT sach_matacgia_fkey;
       public          postgres    false    222    4674    218            �   �   x�3��y��;9C����\&�!���)d<�ݛ�e��|xK^�B^:�߮P��d�q�s�e�e���rrzg�'B4)�e>�ݚ�Prl�����ҹ,8�J3�3�t2/�T� ��N�2�;��̒3 �᮵%P��g��@w��?ܵhB����b���� j�MI      �   I   x��4�4�4�4202�54�54�3�L3�#/V()z�k1��P�)-1~@��y�
��6<ܽ8�+F��� �6      �   �   x���1N1E��)|�(�׉�E(���Y�����%�Pp���@�*Mpi)��M�� �DHS���F@�S��^v��כ|l�>Ը\��[�p�I_��U
O����¸d\r2U����{�j��$汧�.�ڎVڤ�h�U
{zѠ���-��ɉ�k�8�W\(���<DXqj�)<�c�?���-��䂗�����y�5t�������7��.e1����a��M��.����B)%�,�͈�@l�[      �   �   x�3��pR;Ҝ���pwo2�	X�;#?"�Pvx�����;J2J�Z[�e
V�_��_��e��<�=;���53W�Ȅ��'�s��E�3/�WHy�{i2��1�_��
�YKK��Z�4��
G&>ܵ0�+F��� �^<�      �     x�5����@�듧��r5g.�L�PlVT4�	��ĉgaK*jD�"�b��������b���H���Vt���ۮ)��j3ۊ����xx��tJ�rR�=��1�I�X��H\J�\W̧�eY���l@���V�V�r'�c���mI>������c����ᲭE9�_
�~������%IJ��6�8� ��@�#���aߊ�#�[�á$Ή���I��� `� .TN�vc��ލ��*��|����?0h+��(��W��X:Kr2�|19)ʺ�w D�gD�Vވh�7�b9A�s"Z-&�9���L��]Y���x�).B¡!�o�S�P�{Yܔ)��i3~#�!�n�±j����|��Q[��`3ϔeJy鬵!m�ᎊtRD��V<.^��y;�o�Ƅ�Yo�1�#�D��
J?����B(o�n<|o�������zBl�eg���1����.��_�Yt��6��m�6����̭�Pr������d2�o��      �   �  x����JA��ݧ��@4�i-��$
66�z�.���e/�R�XYX���"AL}���p�o�l.����f�cf���ͭ��Z�����T�P�^K��;��a�H%`z�r��7}���/�}K-��y��(ҢJt��Y ����O�He4��4�r���ˡ�z�ދ����$Hli�@/��R�Ӛ�ҁ�'L9.3}��h��Z!u�%BK͈�T��$���/�DO����Z�&}��rFK�.���B���'S@]�#����2�OF&���ԤUUf���#����p�����W�!r�NS�3��k��W�%ˬ5)A>S�����lO�B�B[K��.Q��P=����e�SۭA;>�4��QNhL❯�"I�$��Ïk��o&9k      �   >  x�m��N1��O��\{=��T0a�@�\*^�Mh�����G��	���wc	��7�G1r��I������ �]�����͝��`�ڹ��$3RO���@�N�V$B�`��g�ёr�)���F�n��a���,���
�Z��a��$L@7�#X�	�­D:0IQb\{'��h�nI���١��̗oɾz�gP̤-���Qv���������ZD�P�re��.L�4��_	��g��!$�^���r*�6Ö�A�MB���Uӡr�1;',��"GѹvkK��^4-�[(��j��p���Yb'WMB�?^��     