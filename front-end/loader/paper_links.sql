CREATE DATABASE genie;

\c genie;
CREATE EXTENSION pg_trgm;

DROP TABLE paper_links;

CREATE TABLE paper_links(
  gene_disease_id character varying NOT NULL,
  mesh_id character varying NOT NULL,
  gene_id character varying NOT NULL,
  pmid character varying NOT NULL,
  year smallint NOT NULL,
  citations integer NOT NULL,
  title character varying NOT NULL,
  link character varying NOT NULL,
  id serial PRIMARY KEY
);

CREATE INDEX index_paper_links_on_gene_disease_id ON paper_links USING btree (gene_disease_id);
CREATE INDEX index_paper_links_on_mesh_id ON paper_links USING btree (mesh_id);
CREATE INDEX index_paper_links_on_gene_id ON paper_links USING btree (gene_id);
CREATE INDEX index_paper_links_on_citations ON paper_links USING btree (citations);
